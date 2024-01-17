import Ajv from 'ajv';

function ViewProperty({schema, object}) {
  switch (schema.type) {
    case 'string':
      if (!object instanceof String) {
        throw new Error("Schema and item mismatch");
      }
      return (
        <div className='view-item-value view-item-string'>{object}</div>
      )
    case 'number':
      if (!object instanceof String) {
        throw new Error("Schema and item mismatch");
      }
      return (
        <div className='view-item-value view-item-number'>{object}</div>
      )
    case 'object':
      let rows = [];
      for (const key in schema.properties) {
        const child_schema = schema.properties[key];
        console.log(child_schema);
        if (!key in object) {
          throw new Error("Schema and item mismatch");
        }
        const child_object = object[key];
        rows.push((
          <div key={key}>
            <div className='view-item-name'>
              {child_schema.description}
            </div>
            <ViewProperty
              schema={child_schema}
              object={child_object}
            />
          </div>
        ))
      }
      return (
        <div className='view-item-value view-item-object'>
          {rows}
        </div>
      )
    default:
      throw new Error(`Unknown property type '${schema.type}' in schema`);
  }
}

export function Properties({properties, schema}) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  if (!validate(properties)) {
    throw new Error("Invalid item properties");
  }

  return <ViewProperty
    schema={schema}
    object={properties}
  />
}
