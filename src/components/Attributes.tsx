import { ATTRIBUTE_LIST } from '../utils/consts';
import { Attributes } from '../types';
import { abilityModifier } from '../utils/helpers';

interface AttributesProps {
  attributes: Attributes;
  setAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  maxAttributePoints: number;
}

const AttributesSection: React.FC<AttributesProps> = ({ attributes, setAttributes, maxAttributePoints }) => {
  const totalAttributePoints = Object.values(attributes).reduce((sum, value) => sum + value, 0);

  const handleAttributeChange = (attr: string, value: number) => {
    const newTotal = totalAttributePoints - attributes[attr] + value;
    if (newTotal <= maxAttributePoints) {
      setAttributes(prev => ({ ...prev, [attr]: Math.max(0, value) }));
    } else {
      alert(`Total attribute points cannot exceed ${maxAttributePoints}.`);
    }
  };

  return (
    <>
      <h2>Character Attributes</h2>
      {ATTRIBUTE_LIST.map((attr) => (
        <div key={attr} style={{ marginBottom: '10px' }}>
          <span>
            {attr}: {attributes[attr]}
          </span>
          <span style={{ marginLeft: '10px' }}>
            Modifier: {abilityModifier(attributes[attr])}
          </span>
          <button onClick={() => handleAttributeChange(attr, attributes[attr] + 1)}>+</button>
          <button onClick={() => handleAttributeChange(attr, attributes[attr] - 1)}>-</button>
        </div>
      ))}
    </>
  );
};

export default AttributesSection;
