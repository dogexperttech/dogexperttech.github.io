@echo off
echo ===========================
echo Hyper-V / VBS Killer Script
echo ===========================

:: 1. Disable Hyper-V and Virtual Platforms
echo [1/5] Disable Hyper-V and platforms...
dism /Online /Disable-Feature:Microsoft-Hyper-V-All /NoRestart
dism /Online /Disable-Feature:HypervisorPlatform /NoRestart
dism /Online /Disable-Feature:VirtualMachinePlatform /NoRestart
dism /Online /Disable-Feature:WindowsSubsystemForLinux /NoRestart
dism /Online /Disable-Feature:Windows-Defender-ApplicationGuard /NoRestart

:: 2. Disable VBS (Virtualization Based Security)
echo [2/5] Disabling VBS...
reg add "HKLM\System\CurrentControlSet\Control\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f
reg add "HKLM\System\CurrentControlSet\Control\DeviceGuard" /v RequirePlatformSecurityFeatures /t REG_DWORD /d 0 /f

:: 3. Disable Credential Guard
echo [3/5] Disabling Credential Guard...
reg add "HKLM\System\CurrentControlSet\Control\Lsa" /v LsaCfgFlags /t REG_DWORD /d 0 /f

:: 4. Disable Memory Integrity (Core Isolation)
echo [4/5] Disable Memory Integrity...
reg add "HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f

:: 5. Disable hypervisor startup
echo [5/5] Disable hypervisor launchtype...
bcdedit /set hypervisorlaunchtype off

echo ===========================
echo Done! Please restart.
echo ===========================
breaks
shutdown /r /t 5
