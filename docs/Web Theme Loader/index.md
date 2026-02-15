# Web Theme Loader in TypeScript

When users use my Angular app, they shall be able to select a theme from a theme list, some of which are dark.

If you google `JavaScript theme loader`, you may find many articles and example codes. And Google AI and Copilot and alike may generate fairly decent codes, as many JavaScript programmers have crafted many for over 2 decades.

I have crafted one from scratch based on specific functional requirements and technical requirements, conforming to my design principles for UI, UX and Developer Experience.

## Requirements

Develop an API using TypeScript with helper functions or classes that enable TypeScript developers to construct a theme picker for a website or web application. The implementation may optionally provide friendly integrations for Angular.

### Functional Requirements
1. Support both light and dark themes.  
2. Support more than two themes — at least three themes must be available.  
3. Support commonly used prebuilt themes, optionally combined with an app‑specific color stylesheet such as `colors.css`, with an optional dark‑mode variant like `colors-dark.css`.  
4. Support dynamic switching between themes at runtime.  
5. When the same web app/site is opened in another browser tab, the explicitly selected theme should be preserved and applied.

### Technical Requirements
1. Reusable across multiple applications.  
2. Minimal API surface to ensure easy customization and easy usage.  
3. Neutral with respect to specific UI design choices.  
4. Must be efficient and avoid visual flicker during startup and theme switching.  
5. Usable in both SPA and PWA.  
6. Fully functional in PWAs, offline usage, and intranet environments.  
7. Adjustable after build, bundling, and deployment. For example, an admin should be able to change the number and order of available themes, and modify app‑specific color files.  
8. Themes may be hosted locally or on a CDN.  
9. Selecting a theme that is already loaded should not trigger a reload of the theme.  
10. Core theme management must be separated from the theme‑picker UI.

### Examples in the real world:
1. [Angular Material Doc](https://material.angular.dev/)
2. [PrimeNG](https://primeng.org/)
3. [PrimeVue](https://primevue.org/)
4. [DaisyUI](https://daisyui.com/)


 ** If you find your requirements match mine, please read on.**

 The following sourcecode is crafted in TypeScript for Angular SPA, and it should be easy to use in other Web apps or sites crafted in JavaScript, with little modification.

 ## Theme Loader

themeLoader.ts ([full sourcecode](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/app/themeLoader.ts))
 ```ts
export class ThemeLoader {
  private static readonly key = 'app.theme'; //the key for storing selected theme filename. Generally no need to change
  private static readonly themeLinkId = 'theme';
  private static readonly appColorsLinkId = 'app-colors';
  private static readonly colorsCss = 'colors.css';
  private static readonly colorsDarkCss = 'colors-dark.css'; // if your app use light only or dark only, just make colorsCss and colorsDarkCss the same filename.

  /**
   * selected theme file name saved in localStorage.
   */
  static get selectedTheme(): string | null {
    return localStorage.getItem(this.key);
  };
  private static set selectedTheme(v: string) {
    localStorage.setItem(this.key, v);
  };

  /**
   * 
   * @param picked one of the prebuilt themes, typically used with the app's theme picker.
   * or null for the first one in themesDic, typically used before calling `bootstrapApplication()`.
   * @param appColorsDir if the app is using prebuilt theme only for all color styling, this parameter could be ignore. 
   * Otherwise, null means that colors.css or colors-dark.css is in the root, 
   * or a value like 'conf/' is for the directory under root,
   * or undefined means the app uses theme only for color.
   */
  static loadTheme(picked: string | null, appColorsDir?: string | null) {
    if (!AppConfigConstants.themesDic || Object.keys(AppConfigConstants.themesDic).length === 0) {
      console.error('Need AppConfigConstants.themesDic with at least 1 item');
      return;
    }

    let themeLink = document.getElementById(this.themeLinkId) as HTMLLinkElement;
    if (themeLink) { // app has been loaded in the browser page/tab.
      const currentTheme = themeLink.href.substring(themeLink.href.lastIndexOf('/') + 1);
      const notToLoad = picked == currentTheme;
      if (notToLoad) {
        return;
      }

      const r = AppConfigConstants.themesDic[picked!];
      if (!r) {
        return;
      }

      themeLink.href = picked!;
      this.selectedTheme = picked!;
      console.info(`theme altered to ${picked}.`);

      if (appColorsDir === undefined) {
        return;
      }

      let appColorsLink = document.getElementById(this.appColorsLinkId) as HTMLLinkElement;
      if (appColorsLink) {
        const customFile = r.dark ? this.colorsDarkCss : this.colorsCss;
        appColorsLink.href = (appColorsDir === null) ? customFile : appColorsDir + customFile;
      }

    } else { // app loaded for the first time, then create 
      themeLink = document.createElement('link');
      themeLink.id = this.themeLinkId;
      themeLink.rel = 'stylesheet';
      const firstTheme = picked ?? Object.keys(AppConfigConstants.themesDic!)[0];
      themeLink.href = firstTheme;
      document.head.appendChild(themeLink);
      this.selectedTheme = firstTheme;
      console.info(`Initially loaded theme ${firstTheme}`);

      if (appColorsDir === undefined) {
        return;
      }

      const appColorsLink = document.createElement('link');
      appColorsLink.id = this.appColorsLinkId;
      appColorsLink.rel = 'stylesheet';
      const customFile = AppConfigConstants.themesDic[firstTheme].dark ? this.colorsDarkCss : this.colorsCss;
      appColorsLink.href = (appColorsDir === null) ? customFile : appColorsDir + customFile;
      document.head.appendChild(appColorsLink);
    }
  }
}
 ```

### Configuration

Typically an Web app with JavaScript has some settings that should be loaded at the very beginning synchronously.

Data schema ([full sourcecode](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/environments/themeDef.ts)):
```ts
export interface ThemeDef {
	/** Relative path or URL to CDN */
	filePath: string;
	/** Display name */
	display?: string;
	/** Dark them or not */
	dark?: boolean;
}

export interface ThemesDic {
	[filePath: string]: {
		display?: string,
		dark?: boolean
	}
}
```

siteconfig.js:
```js
const SITE_CONFIG = {
	themesDic: {
		"assets/themes/rose-red.css":{name: "Roes & Red", dark:false},
		"assets/themes/azure-blue.css":{name: "Azure & Blue", dark:false},
		"assets/themes/magenta-violet.css":{name: "Magenta & Violet", dark:true},
		"assets/themes/cyan-orange.css":{name: "Cyan & Orange", dark:true}
	}
}
```
Hints:
* Theme filename can be URL to CDN.
* When the Website or app is launched for the first time, the top one in themesDic is the default.

index.html ([full sourcecode](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/index.html)):
```html
...
<body>
	<script src="conf/siteconfig.js"></script>
    ...
```

### Startup
 To ensure Angular runtime to utilize the theme as early as possible before rendering any component, ThemeLoader must be called before bootstrap:

 main.ts
 ```ts
ThemeLoader.loadTheme(ThemeLoader.selectedTheme, 'conf/');
bootstrapApplication(AppComponent, appConfig); 
```

### UI for Switching Theme

Typically the UI of switching between themes is a dropdown implemented using something like [MatMenu](https://material.angular.dev/components/menu/overview) or [MatSelect](https://material.angular.dev/components/select/overview), while there are Websites for graphic designers coming with complex runtime styles and theme selection UI, like what in PrimeVue. However, I would doubt any business app or consumer app would favor such powerful complexity.

![Angular Material](./media/ngmdmenu.png) ![MatSelect](./media/MatSelect.png)

![daisyui](./media/daisyui.png) ![MatMenu](./media/menu.png)

HTML with MatSelect:
```html
  <mat-form-field>
    <mat-label i18n>Themes</mat-label>
    <mat-select #themeSelect (selectionChange)="themeSelectionChang($event)" [value]="currentTheme">
      @for (item of themes; track $index) {
      <mat-option [value]="item.fileName">{{item.name}}</mat-option>
      }
    </mat-select>
  </mat-form-field>
```

Code behind ([full codes](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/app/app.component.ts)):
```ts
  themes?: ThemeDef[];

	get currentTheme() {
		return ThemeLoader.selectedTheme;
	}
  ...
    this.themes = AppConfigConstants.themesDic ? Object.keys(AppConfigConstants.themesDic).map(k => {
      const c = AppConfigConstants.themesDic![k];
      const obj: ThemeDef = {
        name: c.name,
        fileName: k,
        dark: c.dark
      };
      return obj;
    }) : undefined;
...
  themeSelectionChang(e: MatSelectChange) {
    ThemeLoader.loadTheme(e.value, 'conf/');
  }
```

## Summary

The API exposes 3 contracts:
1. `static loadTheme(picked: string | null, appColorsDir?: string | null)` of themeLoader to be called during startup, and when the app user picks one from available themes.
2. `static get selectedTheme(): string | null` of themeLoader.
3. JavaScript constant SITE_CONFIG that contains a theme dictionary.

### Installation and Integration
1. Add [themeLoader.ts](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/app/themeLoader.ts)
2. Add data schema [`themeDef.ts`](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/environments/themeDef.ts) for the themes dictionary in `siteconfig.js`, along with [`environment.common.ts`](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/environments/environment.common.ts) for strongly typed site config during Web app startup.
3. Call `ThemeLoader.loadTheme()` before the [bootstrap of the Web app](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/main.ts).
4. In the [UI component presenting the theme picker](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/app/app.component.ts), convert the themes dictionary to an array which will be used to present the list. And call `ThemeLoader.loadTheme()` when the picker picks a theme.
5. Prepare [`siteconfig.js`](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/conf/siteconfig.js).
6. In [index.html](https://github.com/zijianhuang/nmce/blob/master/projects/demoapp/src/index.html), add `<script src="conf/siteconfig.js"></script>` .

Remarks:
* Interfaces defined in `themeDef.ts` and `environment.common.ts` won't be built into JavaScript, therefore they are not part of the API

### Web Sites and Apps that Use ThemeLoader

* [Angular Material Components Extension](https://zijianhuang.github.io/nmce/en/)
* [JsonToTable](https://zijianhuang.github.io/json2table/)
* [Personal Blog](https://zijianhuang.github.io/poets)

## Alternative Implementation by Angular Material Documentation

After Angular Material Components v12, the documentation site has been merged into the components' repository.

Please check https://github.com/angular/components/blob/main/docs/src/app/shared/theme-picker/ and https://github.com/angular/material.angular.io/blob/main/src/app/shared/style-manager/ . 

The design basically conforms to the "Requirements" above, though more complex and comprehensive in the contexts of the documentation site, and within its business scope. Overall, decent and elegant enough.

And likely, the design and the implementation have inspired many LLMs based AI code generators.

## Alternative Designs by AI Code Generators

Using the requirements above as prompt, I asked Windows Copilot to generate sourcecode, then  asked M365 Copilot of another account, and the Claude.AI etc.



