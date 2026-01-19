import React from 'react';

export default function SkillsTab({ formData, handleChange }) {
  return (
    <div className="cyber-panel p-3">
      <div className="skills-grid-cyber">
        {Object.entries(formData.skills).map(([key, value]) => (
          <div key={key} className="skill-card-cyber">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="skill-name text-info">{key.replace(/_/g, ' ')}</span>
            </div>
            <div className="d-flex gap-2">
              <div className="skill-sub-input">
                <small>DADOS</small>
                <input type="number" value={value.dados} onChange={e => handleChange(`skills.${key}.dados`, parseInt(e.target.value))} />
              </div>
              <div className="skill-sub-input">
                <small>BÔNUS</small>
                <input type="number" value={value.bonus} onChange={e => handleChange(`skills.${key}.bonus`, parseInt(e.target.value))} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}