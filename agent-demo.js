/**
 * AURA - Agentic AI Phone Manager Interactive Simulation
 * Showcases multi-step agent reasoning, tool selection, and execution loop
 */

(function () {
  const terminalBody = document.getElementById('terminal-body');
  const agentInput = document.getElementById('agent-input');
  const agentSubmitBtn = document.getElementById('agent-submit-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const clearBtn = document.getElementById('terminal-clear-btn');

  if (!terminalBody || !agentInput || !agentSubmitBtn) return;

  let isExecuting = false;

  const demoScenarios = {
    schedule: {
      intent: 'SCHEDULE_EVENT',
      tools: ['GoogleCalendarAPI', 'DeviceContacts', 'ConflictResolver'],
      steps: [
        { label: '🧠 Intent Parser', text: 'Detected intent: Task/Meeting Scheduling with team.', type: 'line-agent' },
        { label: '⚡ Tool Call: CalendarEngine', text: 'Checking schedule conflict for tomorrow 16:00 IST... (0 conflicts found)', type: 'line-step' },
        { label: '👥 Entity Extraction', text: 'Target attendees: "Team ML", Subject: "Machine Learning Study Session".', type: 'line-step' },
        { label: '✨ Execution', text: 'Calendar invitation created with Google Meet link. Push notification dispatched.', type: 'line-success' },
        { label: '📊 Telemetry', text: 'Latency: 184ms | Confidence: 99.2% | Agent Steps: 4/4 Completed', type: 'line-system' }
      ]
    },
    emergency: {
      intent: 'EMERGENCY_GPS_DISPATCH',
      tools: ['GPSLocator', 'EmergencySMSBridge', 'CellularTelemetry'],
      steps: [
        { label: '🚨 Priority Alert', text: 'HIGH PRIORITY: Emergency SOS trigger activated by voice/panic trigger.', type: 'line-agent' },
        { label: '📍 GPS Triangulation', text: 'Acquired fix: 12°58\'23.4"N 77°35\'45.2"E (Bengaluru, Accuracy: ±2.4m).', type: 'line-step' },
        { label: '⚡ Tool Call: SecureSMSGateway', text: 'Encrypted SOS broadcast dispatched to registered emergency contacts.', type: 'line-step' },
        { label: '🛡️ Safety Protocol', text: 'Real-time 15-minute live tracking link generated: https://aura-shield.safe/loc/7841', type: 'line-success' },
        { label: '📊 Telemetry', text: 'Dispatched in 89ms | Encryption: AES-256 | Battery: 88% Optimal', type: 'line-system' }
      ]
    },
    inbox: {
      intent: 'EMAIL_SUMMARIZATION',
      tools: ['MailFetchAPI', 'NeuralTextSummarizer', 'PriorityClassifier'],
      steps: [
        { label: '📬 Mail Scanner', text: 'Retrieved 24 new unread items from primary mailbox.', type: 'line-agent' },
        { label: '🧠 Neural Classifier', text: 'Classified 3 urgent messages regarding AI Internship & Hackathon submissions.', type: 'line-step' },
        { label: '📝 Summarization', text: 'Generated 3-bullet concise digest with deadline warnings for Friday 5 PM.', type: 'line-step' },
        { label: '✨ Action Completed', text: 'Morning brief card added to phone lockscreen widget.', type: 'line-success' },
        { label: '📊 Telemetry', text: 'Processed 4,200 tokens | Latency: 240ms | Summary compression: 88%', type: 'line-system' }
      ]
    },
    weather: {
      intent: 'METEOROLOGICAL_QUERY',
      tools: ['OpenWeatherMapAPI', 'GeolocationService', 'AlertScheduler'],
      steps: [
        { label: '⛅ Weather Engine', text: 'Queried hyperlocal meteorological station: Bengaluru East.', type: 'line-agent' },
        { label: '🌡️ Condition Report', text: 'Current: 27°C, Humidity: 68%, Precipitation Probability: 75% at 17:30.', type: 'line-step' },
        { label: '💡 Agent Recommendation', text: 'High rain probability detected during evening commute. Reminder alert armed.', type: 'line-step' },
        { label: '✨ Execution', text: '"Carry an umbrella" smart reminder set for 16:45 IST.', type: 'line-success' },
        { label: '📊 Telemetry', text: 'API response: 110ms | Forecast Accuracy: 96%', type: 'line-system' }
      ]
    },
    default: {
      intent: 'AUTONOMOUS_TASK_PLANNER',
      tools: ['GenericAgentCore', 'TaskDecomposer', 'DeviceRuntime'],
      steps: [
        { label: '🧠 Intent Parser', text: 'Analyzing natural language request and context...', type: 'line-agent' },
        { label: '⚡ Reasoning Loop', text: 'Generated autonomous execution graph with 3 sub-tasks.', type: 'line-step' },
        { label: '🛠️ Tool Invocation', text: 'Executing requested phone actions in secure sandbox environment.', type: 'line-step' },
        { label: '✨ Execution Complete', text: 'Task fulfilled successfully and verified with zero anomalies.', type: 'line-success' },
        { label: '📊 Telemetry', text: 'Autonomous agent cycle completed in 176ms.', type: 'line-system' }
      ]
    }
  };

  function appendLine(text, className) {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function runAgentSimulation(prompt) {
    if (isExecuting) return;
    isExecuting = true;
    agentSubmitBtn.disabled = true;

    // Echo user prompt
    appendLine(`&gt; <strong>User:</strong> "${prompt}"`, 'line-user');

    // Select scenario
    const lower = prompt.toLowerCase();
    let scenario = demoScenarios.default;
    if (lower.includes('schedule') || lower.includes('study') || lower.includes('meeting')) {
      scenario = demoScenarios.schedule;
    } else if (lower.includes('emergency') || lower.includes('safety') || lower.includes('alert') || lower.includes('gps')) {
      scenario = demoScenarios.emergency;
    } else if (lower.includes('inbox') || lower.includes('email') || lower.includes('mail') || lower.includes('summarize')) {
      scenario = demoScenarios.inbox;
    } else if (lower.includes('weather') || lower.includes('rain') || lower.includes('forecast') || lower.includes('umbrella')) {
      scenario = demoScenarios.weather;
    }

    appendLine(`<em>[AURA Runtime] Initializing agent loop for intent: ${scenario.intent}...</em>`, 'line-system');

    // Staggered execution
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < scenario.steps.length) {
        const step = scenario.steps[currentStep];
        appendLine(`<strong>${step.label}:</strong> ${step.text}`, step.type);
        currentStep++;
      } else {
        clearInterval(interval);
        isExecuting = false;
        agentSubmitBtn.disabled = false;
        appendLine('---', 'line-system');
      }
    }, 450);
  }

  agentSubmitBtn.addEventListener('click', () => {
    const text = agentInput.value.trim();
    if (text) {
      runAgentSimulation(text);
      agentInput.value = '';
    }
  });

  agentInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      agentSubmitBtn.click();
    }
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      agentInput.value = prompt;
      runAgentSimulation(prompt);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalBody.innerHTML = `
        <div class="terminal-line line-system">[AURA Kernel v2.4 initialized. Ready for agentic queries...]</div>
        <div class="terminal-line line-system">Type a command below or click a preset prompt to test real-time intent reasoning.</div>
      `;
    });
  }
})();
