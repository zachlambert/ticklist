import Ajv from 'ajv';

function ViewProperty({schema, object}) {
  switch (schema.type) {
    case 'string':
      if (!object instanceof String) {
        throw new Error("Schema and object mismatch");
      }
      return (
        <div>{object}</div>
      )
    case 'number':
      if (!object instanceof String) {
        throw new Error("Schema and object mismatch");
      }
      return (
        <div>{object}</div>
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
          <div key={key} className='flex flex-row flex-nowrap align-baseline gap-2 p-2'>
            <div>
              {child_schema.description}:
            </div>
            <ViewProperty
              schema={child_schema}
              object={child_object}
            />
          </div>
        ))
      }
      return (
        <div className='flex flex-col flex-nowrap'>
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
