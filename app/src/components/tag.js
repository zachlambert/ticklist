
function tagColor(tag) {
  const min = 150;
  const max = 255;
  let score_color = min + Math.floor((tag.vote_score_mean/100) * (max-min));
  score_color = Math.max(min, Math.min(max, score_color));
  const rgb = [
    min, min, score_color
  ];
  const hex = '#' + rgb.map((x) => x.toString(16)).join('');
  return hex;
}

function Tag({tag}) {
  return (
    <div
      className='px-2 py-1 rounded'
      style={{backgroundColor: tagColor(tag)}}
    >
      <span>{tag.tag}</span>
    </div>
  );
}

function TagList({tags}) {
  return (
    <div className='
      flex flex-row flex-nowrap
      items-center
      gap-2
      px-2 py-1
    '>
      {
        tags.map((tag, idx) => {
          return (<Tag key={idx} tag={tag} />)
        })
      }
    </div>
  );
}

export { Tag, TagList };
