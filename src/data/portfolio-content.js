// Editorial copy grounded in assets/hi/data-sheet.json.
// Facts are not invented. Wording is rewritten for hiring managers.

export const profile = {
  fullName: 'Chenna Kesava Reddy Yenugu',
  shortName: 'Kesava Reddy',
  monogram: 'CK',
  role: 'Embedded Software Developer',
  location: 'Bangalore, India',
  email: 'chennakesava0517@gmail.com',
  phone: {
    display: '+91 80744 53994',
    href: 'tel:+918074453994',
  },
  linkedin: 'https://www.linkedin.com/in/chenna-kesava-b47901228',
  resumeHref: '/Chenna-Kesava-Reddy-Yenugu-Resume.pdf',
  eyebrow: 'Embedded software · Bangalore',
  headline: 'Firmware and Linux software for systems that have to work on the metal.',
  lead:
    'I write C and Embedded C for ARM-based hardware, Linux internals, and the buses that connect them — CAN, UART, SPI, I2C, GPIO, and TCP/IP. I currently contribute to embedded software and Linux-based systems in R&D at Suprajit Engineering Limited.',
}

export const snapshot = [
  {
    label: 'Now',
    value: 'Suprajit Engineering Limited',
    detail: 'Embedded Software Developer, R&D · May 2026 – Present',
  },
  {
    label: 'Training',
    value: 'Vector India Pvt. Ltd.',
    detail: 'Automotive ECU communication over CAN · Jun 2025 – Jan 2026',
  },
  {
    label: 'Education',
    value: 'B.Tech, Electrical & Electronics',
    detail: 'JNTUA College of Engineering, Kalikiri · 2021 – 2025 · 78.2%',
  },
]

export const experience = [
  {
    id: 'suprajit-embedded-software-developer',
    organization: 'Suprajit Engineering Limited',
    role: 'Embedded Software Developer',
    context: 'R&D',
    dates: 'May 2026 – Present',
    location: null,
    summary:
      'Contributing to embedded software development and Linux-based embedded systems in an R&D environment.',
    highlights: [],
  },
  {
    id: 'vector-embedded-systems-trainee',
    organization: 'Vector India Pvt. Ltd.',
    role: 'Embedded Systems Trainee',
    context: 'Automotive ECU communication',
    dates: 'Jun 2025 – Jan 2026',
    location: 'Bangalore',
    summary:
      'Eight months of hands-on training in automotive ECU-to-ECU communication using the CAN protocol, with emphasis on control logic, debugging, and real-time validation.',
    highlights: [
      'Developed and validated automotive ECU-to-ECU communication logic for vehicle control functions.',
      'Implemented CAN message flow between ECUs for vehicle indicators such as headlights and turn signals.',
        'Designed control logic and checked system behavior across multiple test scenarios.',
      'Carried out debugging, integration testing, and functional verification in a real-time environment.',
    ],
  },
]

export const projectOrder = [
  'rfid-employee-attendance',
  'ultrasonic-parking-collision-avoidance',
  'vehicle-parameter-monitoring',
  'multi-client-chat',
  'bluetooth-home-automation',
  'bus-reservation',
  'online-exam',
  'load-frequency-control',
]

export const projectContent = {
  'rfid-employee-attendance': {
    shortTitle: 'RFID attendance system',
    category: 'Firmware',
    eyebrow: 'ARM7 · UART · SPI',
    description:
      'An LPC2129-based attendance system that turns an RFID scan into a verified entry or exit record.',
    detail:
      'Designed and developed an RFID attendance system on the LPC2129 ARM7 microcontroller. Interfaced the reader over UART and SPI, then wrote Embedded C firmware for unique ID verification, attendance logging, and system control, with attention to memory use.',
    focus: 'Device firmware and peripheral integration',
    technologies: ['Embedded C', 'LPC2129', 'ARM7', 'RFID', 'UART', 'SPI'],
    video: '/work/rfid-arm-uart-spi.mp4',
    videoFrame: 'landscape',
  },
  'ultrasonic-parking-collision-avoidance': {
    shortTitle: 'Ultrasonic parking assistance',
    category: 'Automotive',
    eyebrow: 'CAN · EMBEDDED C',
    description:
      'A reverse-parking and collision-avoidance project that converts ultrasonic distance into proximity alerts over CAN.',
    detail:
      'Designed a real-time automotive safety project using ultrasonic sensors for obstacle distance detection. Developed Embedded C algorithms for proximity detection and adaptive alerts, supporting reverse-parking guidance and collision-prevention logic on the CAN bus.',
    focus: 'Proximity sensing and in-vehicle messaging',
    technologies: ['Embedded C', 'CAN', 'Ultrasonic sensors'],
    video: '/work/ultrasonic-parking.mp4',
    videoFrame: 'portrait',
  },
  'vehicle-parameter-monitoring': {
    shortTitle: 'Vehicle parameter monitoring',
    category: 'Firmware',
    eyebrow: 'SPI · I2C',
    description:
      'A microcontroller system that gathers vehicle metrics from multiple sensors over high-speed SPI and I2C.',
    detail:
      'Implemented a real-time vehicle-parameter monitoring system by interfacing multiple sensors through SPI and I2C. Developed data-acquisition and processing algorithms so the microcontroller could track vehicle metrics as they arrived.',
    focus: 'Sensor acquisition and processing',
    technologies: ['SPI', 'I2C', 'Embedded microcontroller', 'Sensors'],
    video: '/work/vehicle-parameter-monitoring.mp4',
    videoFrame: 'portrait',
  },
  'multi-client-chat': {
    shortTitle: 'Linux multi-client chat',
    category: 'Linux systems',
    eyebrow: 'IPC · MESSAGE QUEUES',
    description:
      'A C application in which a server and several clients exchange messages through Linux message queues.',
    detail:
      'Built a server and multi-client chat application using Linux interprocess communication in C. Message queues carried traffic between processes, and the design was tested across multiple terminals.',
    focus: 'Linux IPC',
    technologies: ['C', 'Linux', 'IPC', 'Message queues'],
  },
  'bluetooth-home-automation': {
    shortTitle: 'Bluetooth home automation',
    category: 'Embedded systems',
    eyebrow: 'ARDUINO · RELAYS',
    description:
      'An Arduino project that switches household appliances from a mobile application over Bluetooth.',
    detail:
      'Developed a Bluetooth home-automation system on Arduino so household appliances could be controlled from a mobile application. Implemented wireless communication and relay interfacing for real-time device switching.',
    focus: 'Wireless control and actuation',
    technologies: ['Arduino', 'Bluetooth', 'Relay interfacing'],
  },
  'bus-reservation': {
    shortTitle: 'Bus reservation system',
    category: 'Systems software',
    eyebrow: 'C · DATA STRUCTURES',
    description:
      'A console reservation workflow covering bookings, cancellations, availability, and email alerts.',
    detail:
      'Developed a C application for bus reservations, using data structures to manage records and file handling to store and retrieve bookings. Automated email alerts for booking, cancellation, and availability through SMTP.',
    focus: 'Records and application logic',
    technologies: ['C', 'Data structures', 'SMTP', 'File handling'],
  },
  'online-exam': {
    shortTitle: 'Timed examination system',
    category: 'Systems software',
    eyebrow: 'C++ · OOP',
    description:
      'A C++ examination application with separate admin and user authentication and a timed exam flow.',
    detail:
      'Structured an examination system in C++ using object-oriented design and file handling. Implemented authentication for admin and user modules, and added timer-based exam functionality.',
    focus: 'Authentication and timed workflows',
    technologies: ['C++', 'Object-oriented programming', 'File handling'],
  },
  'load-frequency-control': {
    shortTitle: 'Load frequency control',
    category: 'Academic',
    eyebrow: 'MATLAB SIMULINK',
    description:
      'A two-area power-system study comparing PID, Fuzzy Logic, and ANFIS controllers on frequency deviation and stability.',
    detail:
      'Built and simulated a two-area interconnected power system in MATLAB Simulink. Implemented PID, Fuzzy Logic, and ANFIS controllers, then compared stability, frequency deviation, and response characteristics.',
    focus: 'Simulation and controller comparison',
    technologies: ['MATLAB Simulink', 'PID', 'Fuzzy Logic', 'ANFIS'],
  },
}

export const capabilities = [
  {
    number: '01',
    title: 'Firmware',
    description:
      'Embedded C and ARM development, from peripheral drivers to application control on constrained microcontrollers.',
    skills: ['C', 'Embedded C', 'C++', 'ARM7 / LPC2129', 'Peripheral drivers', 'FreeRTOS (working knowledge)'],
  },
  {
    number: '02',
    title: 'Embedded Linux',
    description:
      'Linux system programming and internals, with practical IPC work and a working foundation in the Yocto Project.',
    skills: ['Linux internals', 'System programming', 'Yocto Project', 'IPC / message queues'],
  },
  {
    number: '03',
    title: 'Communication',
    description:
      'Connecting controllers, sensors, and software over automotive CAN, board-level buses, and network sockets.',
    skills: ['CAN', 'UART', 'SPI', 'I2C', 'GPIO', 'TCP/IP', 'UDP', 'Raw sockets'],
  },
  {
    number: '04',
    title: 'Bring-up and debug',
    description:
      'Finding faults in firmware and ECU communication through debugging, integration testing, and functional verification.',
    skills: ['GDB', 'Embedded debugging', 'Integration testing', 'Functional verification'],
  },
]

export const education = {
  degree: 'Bachelor of Technology',
  field: 'Electrical and Electronics Engineering',
  institution: 'JNTUA College of Engineering, Kalikiri',
  dates: '2021 – 2025',
  grade: '78.2%',
}

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#contact', label: 'Contact' },
]
