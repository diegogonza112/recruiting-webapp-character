import { Attributes } from '../types';
import { SKILL_LIST } from '../utils/consts';
import { abilityModifier } from '../utils/helpers';

interface SkillsProps {
  attributes: Attributes;
  skillPoints: Record<string, number>;
  setSkillPoints: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const SkillsSection: React.FC<SkillsProps> = ({ attributes, skillPoints, setSkillPoints }) => {
  const availableSkillPoints = 10 + 4 * abilityModifier(attributes.Intelligence);
  const totalPointsSpent = Object.values(skillPoints).reduce((sum, points) => sum + points, 0);

  const handleSkillChange = (skillName: string, delta: number) => {
    setSkillPoints(prev => {
      const newPoints = Math.max(0, (prev[skillName] || 0) + delta);
      if (totalPointsSpent + delta > availableSkillPoints) return prev;
      return { ...prev, [skillName]: newPoints };
    });
  };

  return (
    <>
      <p>Available Skill Points: {availableSkillPoints - totalPointsSpent}</p>
          {SKILL_LIST.map((skill) => {
            const attributeMod = abilityModifier(attributes[skill.attributeModifier]);
            const skillTotal = skillPoints[skill.name] + attributeMod;

            return (
              <div key={skill.name} style={{ marginBottom: '10px' }}>
                <span>
                  {skill.name} - points: {skillPoints[skill.name]}
                  <button onClick={() => handleSkillChange(skill.name, 1)}>+</button>
                  <button onClick={() => handleSkillChange(skill.name, -1)}>-</button>
                </span>
                <span style={{ marginLeft: '10px' }}>
                  Modifier ({skill.attributeModifier}): {attributeMod}
                </span>
                <span style={{ marginLeft: '10px' }}>
                  Total: {skillTotal}
                </span>
              </div>
            );
          })}
    </>
  );
};

export default SkillsSection;
