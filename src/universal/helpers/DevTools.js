import React from 'react';
import createDevTools from 'redux-devtools/lib/createDevTools';
import persistState from 'redux-devtools/lib/persistState';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="H" changePositionKey="Q">
    <LogMonitor />
  </DockMonitor>
);

DevTools.composers = () => [
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
];

export default DevTools;
