Spearmint aims to support running multiple games without modifying the engine. However, there are good reasons for standalone games to use a modified engine; for a better user experience or making incompatible changes.

There is essentially no difference between a game and a mod. A game can choose to inherit data files from other game directories which makes it a _mod_, though the engine does nothing different beside literally inherit data files.

# CGame improvements

You may want to add new CTF/1FCTF/Overload sounds for splitscreen, see [[New Sounds]] page.

Some cvars that were moved from client to cgame have not been renamed to keep Team Arena menu compatibility. If you rename them, update q3_ui too.
* cl_freelook -> cg_freelook
* cl_run -> cg_run

# Game Window Branding

The engine loads the game window title from `description.txt` in the game directory (example: `baseq3/description.txt`). The engine defaults to the fs_game value (example: `baseq3`) if `description.txt` file is not found.

The engine loads the window icon from either windowicon32.png (32x32; Windows) or windowicon.png (1024x1024; GNU/Linux, OS X, or other platforms) from the game search path (example: `baseq3/spearmint-0.1-patch.pk3`). For testing you enable/disable using windowicon32 using `r_forceWindowIcon32 1` or `r_forceWindowIcon32 0`.

# Distributing Your Game

For standalone games (i.e., not a mod) it is probably most convenient for users if you include the engine in your game download. This isn't a requirement, having the user download Spearmint separate would work fine.

If not including the engine, you may want to have a Windows `.bat` file or Unix shell script to auto load your game using `spearmint_x86.exe +set fs_game jumpland` or similar. Otherwise the user will need to have Spearmint Quake 3 install to choose to load your game through the menu. This will hopefully be solved in the future by loading a launcher by default instead of Spearmint Quake 3.

Something that is possibly negative about this is the server browser for your game will show all Spearmint games and mods. Which might not be desirable if you want your game to be _completely separate_ or if for example you want the game to be _kid friendly_ and not allow joining Spearmint Quake 3 servers by accident (this does require the user to have specifically added the Quake 3 data files to the Spearmint install). This can be solved using 'network game name' discussed below. Though, if you're not concerned about other games being shown in the server browser and mods menu or having the user install the engine and game separate, this is a good and simple option.


## Bundling Spearmint / Separate Game

If you include the engine in your game downloads you should change the default loaded game, the settings directory, and network game name.

The reason for changing the 'network game name' is so that only your game and mods for it will be shown in the server browser. The reason for changing the settings (home path) directory is so that settings and downloaded mods will be separate from ones for the main _Spearmint_ home path (which may be used by Spearmint Quake 3 and other games). If these are not changed, there could be mods auto downloaded that are shown in both _Spearmint_ and your game but only function in one or the other, which would be annoying for users.

These changes can all be set at start up using command line options via Windows shortcuts or bat files, or Unix shell scripts.

Example start up options for a fictional game named _Jump Land Adventure_;

`spearmint_x86.exe +set fs_game jumpland +set com_gamename JumpLand +set com_homepath "Jump Land Adventure"`

fs_game should be lowercase without spaces. com_gamename cannot have spaces (it would cause dpmaster not to show your game servers). com_gamename is never displayed to the user in-game, so it doesn't matter what it is as long as it's unique to your game (i.e., not Spearmint or the _game name_ of another game that uses DPmaster protocol). com_homepath can have spaces. On Linux, com_homepath should start with a period and conventionally use no spaces and be lowercase (i.e., `.jumplandadventure`).

  * Windows: \%APPDATA%\ `com_homepath value` \
  * Linux: /home/username/`com_homepath value`/
  * OS X: /Users/username/Library/Application Support/`com_homepath value`/

You may also want to rename the engine client and server for posterity / professionalize. This can be done manually or by changing `CLIENT` and `SERVER` in `Makefile`.

## Custom Compiled Engine

If you do not want to set then using command line options, you will need to make some changes and compile the engine for each platform (Windows, Linux, OS X, ..) you want to support.

If you have not compiled Spearmint, you should probably figure that out before getting to far into this. See [[Compiling]].

OS X requires additional changes (because :apple: is special) to `make-macosx-app.sh` for customizing the AppBundle. They are not documented here.

Since you're recompiling the engine you may want to replace the Windows EXE icon `misc/quake3.ico` with a icon for your game.

In the engine source files `Makefile` and `code/qcommon/qcommon.h` there are options that correspond to the command line options already discussed.

`BASEGAME` is in both `Makefile` and `code/qcommon/qcommon.h`. The other options are in `code/qcommon/qcommon.h`.

* `BASEGAME` corresponds to `fs_game`
* `GAMENAME_FOR_MASTER` corresponds to `com_gamename`
* `HOMEPATH_NAME_UNIX` corresponds to `com_homepath` for Linux (i.e., `".jumplandadventure"`)
* `HOMEPATH_NAME_WIN` corresponds to `com_homepath` for Windows (i.e., `"Jump Land Adventure"`)
* `HOMEPATH_NAME_MACOSX` corresponds to `com_homepath` for Mac OS X. By default it uses same value as Windows -- which is probably always fine.

It would be useful to leave `PRODUCT_NAME` and `PRODUCT_VERSION` (in both `Makefile` and `code/qcommon/qcommon.h`) as they are, to show what version of Spearmint this is based on. Changing the 5 settings listed above do not break compatibility with Spearmint. Technically someone could set them using command line options to have 'regular' Spearmint.

You will be required to give the source code to anyone that has the engine binaries. If distributing the binaries to the public online, for convince for all parties involved it would be best to create a source code repository online on GitHub or some other website.

From `code/qcommon/qcommon.h` for reference;
```
// Engine name
#define PRODUCT_NAME				"Spearmint"

// Keep this in-sync with VERSION in Makefile.
#ifndef PRODUCT_VERSION
	#define PRODUCT_VERSION			"0.1"
#endif

#define Q3_VERSION PRODUCT_NAME " " PRODUCT_VERSION

// Settings directory name
#define HOMEPATH_NAME_UNIX			".spearmint"
#define HOMEPATH_NAME_WIN			"Spearmint"
#define HOMEPATH_NAME_MACOSX		HOMEPATH_NAME_WIN

// Separates games in server browser. Must NOT contain whitespace (dpmaster will reject the game servers).
// Change this if not compatible with Spearmint games aka cannot play them (such as if you break VM compatibility).
#define GAMENAME_FOR_MASTER			"Spearmint"

// Game's engine settings for compatibility and other information needed before loading CGame VM.
// Probably don't need to change this, but if you break compatiblity feel free to give it a less stupid name.
#define GAMESETTINGS				"mint-game.settings"

// Prefix for game and cgame virtual machines. Example: vm/PREFIXcgame.qvm, PREFIXcgame_x86.dll
// Change this if you break VM API compatibility with Spearmint.
// You'll also need to change VM_PREFIX in game code Makefile.
#define VM_PREFIX					"mint-"

// Prefix for renderer native libraries. Example: PREFIXopengl1_x86.dll
// Change this if you break renderer compatibility with Spearmint.
// You'll also need to change RENDERER_PREFIX in Makefile.
#define RENDERER_PREFIX				"mint-renderer-"

// Default game to load (default fs_game value).
// You can change this and it won't break network compatiblity.
#ifndef BASEGAME
	#define BASEGAME				"baseq3"
#endif

// In the future if the client-server protocol is modified, this may allow old and new engines to play together
//#define LEGACY_PROTOCOL

// Heartbeat for dpmaster protocol. You shouldn't change this unless you know what you're doing
#define HEARTBEAT_FOR_MASTER		"DarkPlaces"
#define FLATLINE_FOR_MASTER			HEARTBEAT_FOR_MASTER

#define MAX_MASTER_SERVERS      5	// number of supported master servers

#define DEMOEXT	"mintdemo"			// standard demo extension
```


## Extending the Engine, Incompatible with Spearmint

After you have a custom compiled version of Spearmint, you may decide to add a new features or make changes that make your engine incompatible with Spearmint.

Some examples for incompatible changes are when you change the data that is passed between the engine and renderer or engine and Game VM or engine and CGame VM, or change the behavior of [[shader|shaders]] keywords. New shader keywords should maybe be considered a incompatible change too.

If you make the engine incompatible with Spearmint, there are some changes that would be nice if you made. I'd like to avoid crashes or issues when someone tries to mix _Speamint_ API and custom API engines and game logic. So if you want to make the all the changes without being concerned about _which_ APIs you've actually changed, that's fine.

Change `PRODUCT_NAME` (in `code/qcommon/qcommon.h`) from `Spearmint` to `Jump Land Engine` and optionally change `PRODUCT_VERSION` (in both `Makefile` and `qcommon.h`) to show that the engine is not compatible with Spearmint.

If you have not already renamed the engine client and server, please do so; This can be done by changing `CLIENT` and `SERVER` in `Makefile`.

### Demos

To make it more obvious what engine can play a game demonstration (replay) and make it possible to  add support in the future for playing demo files when the user opens them in the operating system's file manager; change `DEMOEXT` in `code/qcommon/qcommon.h` from `.mintdemo` to `.jumplanddemo`.

### Renderer API

If you change `code/renderercommon/tr_public.h` or `code/renderercommon/tr_types.h` which contains the renderer API, change the value of `RENDERER_PREFIX` in `Makefile` and `code/qcommon/qcommon.h` from `mint-renderer-` to `jumpland-renderer-`.

### Game / CGame VM API

If you change the Game/CGame VM APIs you may want to change the name of the VMs to allow a game to have VMs for both your engine and Spearmint or make it obvious what game they are for. Change `VM_PREFIX` in (game code) `Makefile` and (engine) `code/qcommon/qcommon.h` from `mint-` to `jumpland-`.

If you change what the engine expects from Game VM syscalls or what the engine passes to `vmMain` calls, change `GAME_API_NAME` in `code/game/g_public.h` from `"SPEARMINT_GAME"` to `"JUMPLAND_GAME"` in both the engine and your game code projects.

If you change `code/renderercommon/tr_types.h` or what the engine expects from CGame VM syscalls or what the engine passes to `vmMain` calls, change `CG_API_NAME` in `code/cgame/cg_public.h` from `"SPEARMINT_CGAME"` to `"JUMPLAND_CGAME"` in both the engine and your game code projects.
