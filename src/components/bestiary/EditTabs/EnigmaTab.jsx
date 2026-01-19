import React from 'react';
import { Form } from 'react-bootstrap';
import { Lock } from 'lucide-react';

export default function EnigmaTab({ formData, handleChange }) {
  return (
    <div className="cyber-panel p-4 enigma-container">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="glitch-box"><Lock size={20}/></div>
        <h5 className="mb-0 text-danger fw-black tracking-widest">PROTOCOLO_ENIGMA.LOG</h5>
      </div>
      <div className="position-relative">
        <div className="scan-line"></div>
        <Form.Control 
          as="textarea" 
          rows={12} 
          className="cyber-textarea" 
          placeholder="Insira os dados criptografados do Enigma do Medo..."
          value={formData.enigma}
          onChange={e => handleChange("enigma", e.target.value)}
        />
      </div>
    </div>
  );
}