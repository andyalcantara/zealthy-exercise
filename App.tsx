/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { FontColorProvider } from './src/contexts/ModesContext';
import TicketSubmissionComponent from './src/TicketSubmissionComponent/TicketSubmissionComponent';

function App(): React.JSX.Element {
  

  return (
    <FontColorProvider>
      <TicketSubmissionComponent />
    </FontColorProvider>
  );
}

export default App;
