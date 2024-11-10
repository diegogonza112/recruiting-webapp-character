import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './utils/consts';
import { Class, Attributes } from './types';
import { useFetchCharacter, useSaveCharacter } from './api/characterHooks';
import AttributesSection from './components/Attributes';
import ClassesSection from './components/Classes';
import SkillsSection from './components/Skills';

const MAX_ATTRIBUTE_POINTS = 70;

const App = () => {
  const defaultAttributes = ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = 10;
    return acc;
  }, {} as Attributes);

  const defaultSkills = SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = 0;
    return acc;
  }, {} as Record<string, number>);

  const [attributes, setAttributes] = useState<Attributes>(defaultAttributes);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [skillPoints, setSkillPoints] = useState<Record<string, number>>(defaultSkills);

  const { data, isLoading, error } = useFetchCharacter();
  const saveCharacterMutation = useSaveCharacter();

  useEffect(() => {
    if (data && data.body.attributes && data.body.skillPoints) {
      setAttributes(data.body.attributes);
      setSkillPoints(data.body.skillPoints);
    }
  }, [data]);

  const handleSaveCharacter = () => {
    saveCharacterMutation.mutate({ attributes, skillPoints });
  };

  const newCharacter = () => {
    saveCharacterMutation.mutate({ defaultAttributes, defaultSkills });
    setAttributes(defaultAttributes);
    setSkillPoints(defaultSkills);
  }

  if (isLoading) return <p>Loading character data...</p>;
  if (error) return <p>Error loading character data: {error.message}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
        <button onClick={handleSaveCharacter} disabled={saveCharacterMutation.isPending}>
          {saveCharacterMutation.isPending ? 'Saving...' : 'Save Character'}
        </button>
        <button onClick={newCharacter} disabled={saveCharacterMutation.isPending}>
          New Character
        </button>
      </header>
      <section className="App-section">
        <AttributesSection
          attributes={attributes}
          setAttributes={setAttributes}
          maxAttributePoints={MAX_ATTRIBUTE_POINTS}
        />
        <ClassesSection
          attributes={attributes}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        <SkillsSection
          attributes={attributes}
          skillPoints={skillPoints}
          setSkillPoints={setSkillPoints}
        />
      </section>
    </div>
  );
};

export default App;
