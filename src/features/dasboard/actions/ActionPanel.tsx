import React from 'react';
import { Send, CheckCircle, XCircle } from 'lucide-react';
import './css/Actions.css';

const ActionPanel: React.FC = () => {
  return (
<aside className="actions-panel">
  <button className="glass-tile send-tile" title="Send">
    <Send className="icon" size={20} />
    <span>Send</span>
  </button>
  <button className="glass-tile submit-tile" title="Submit">
    <CheckCircle className="icon" size={20} />
    <span>Submit</span>
  </button>
  <button className="glass-tile cancel-tile" title="Cancel">
    <XCircle className="icon" size={20} />
    <span>Cancel</span>
  </button>
</aside>
  );
};

export default ActionPanel;
