const FeatureList = ({ featureType, data }) => {
  let listClassName = `candle-${featureType}-list`;

  let list = (
    <ul className={listClassName}>
      {data.map((item) => (
        <li className="list-item" key={item.id}>
          {item.value}
        </li>
      ))}
    </ul>
  );

  return list;
};

export default FeatureList;
