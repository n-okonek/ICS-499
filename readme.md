# Emulator as a Service (EaaS)
## Overview
EaaS is a web-based Nintendo Entertainment System (NES) emulator bundled with a cloud based Read-Only Memory (ROM) management system. Users will be able to play any NES game in their browser with the emulator. The emulator will run in the browser and the ROMs it runs will be fetched remotely from a separate ROM management backend. Through a web-based client, the user will be able to upload, delete and manage their personal ROMs in the ROM management system. The remote ROM management system will support account-based authentication and users will not have access to other users’ ROMs. The ROM management system will interface with a separate database instance to store ROMs as binary blobs.
## Architecture
EaaS is composed of two distinct components. The NES emulator and the ROM management system.
###	NES Emulator
The NES emulator is a JavaScript application that runs locally in the user's browser. The emulator mimics the hardware of a NES. The emulator is also composed of an interop layer that maps keyboard and mouse controls to the standard NES controller. The emulator is “booted” with a file path URL to a ROM. It immediately begins loading and executing the contents of the ROM. The NES emulator will be encapsulated within the frontend of the ROM management system.
###	ROM Management System
The ROM management system is composed of a frontend and backend.
#### Frontend
The frontend provides the user interface in which users can upload, manage, delete and boot their ROMs. When a user decides to boot a ROM, the frontend will initialize an instance of the NES emulator. This frontend also provides other UI elements needed for the user to login/signup.
#### Backend
The backend of the ROM management system contains all the ROM and user management logic. The backend is a remote server which listens and responds to requests from the frontend. The backend is also connected to an external database instance. The database instance stores user account information along with ROM data and ROM metadata.