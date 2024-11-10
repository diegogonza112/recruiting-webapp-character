import { CLASS_LIST } from '../utils/consts';
import { Class, Attributes } from '../types';

interface ClassesProps {
  attributes: Attributes;
  selectedClass: Class | null;
  setSelectedClass: React.Dispatch<React.SetStateAction<Class | null>>;
}

const ClassesSection: React.FC<ClassesProps> = ({ attributes, selectedClass, setSelectedClass }) => {
  const meetsClassRequirements = (className: Class): boolean => {
    const requirements = CLASS_LIST[className];
    return Object.keys(requirements).every(attr => attributes[attr] >= requirements[attr]);
  };

  const handleClassSelection = (className: Class) => {
    setSelectedClass(className === selectedClass ? null : className);
  };

  return (
    <div>
      <h2>Available Classes</h2>
        {Object.keys(CLASS_LIST).map((className: Class) => (
          <div
            onClick={() => handleClassSelection(className)}
            key={className}
            style={{
              backgroundColor: meetsClassRequirements(className) ? 'lightgreen' : 'lightcoral',
              color: meetsClassRequirements(className) ? 'black' : 'white',
              padding: '10px',
              margin: '10px 0',
              cursor: 'pointer',
              border: '1px solid gray',
            }}
          >
            <h3>{className}</h3>
            {selectedClass === className && (
              <div style={{ marginTop: '10px', padding: '10px', border: '1px solid gray' }}>
                <h2>Minimum Requirements for {selectedClass}</h2>
                <ul>
                  {Object.entries(CLASS_LIST[selectedClass]).map(([attr, value]) => (
                    <li key={attr}>
                      {attr}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {meetsClassRequirements(className) ? <p>Eligible for this class!</p> : null}
          </div>
      ))}
    </div>
  );
};

export default ClassesSection;
