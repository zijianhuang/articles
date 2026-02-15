# Web Theme Loader in TypeScript

If you google `JavaScript theme loader`, you may find many articles and example codes. And Google AI and Copilot and alike may generate fairly decent codes, as many JavaScript programmers have crafted many for over 2 decades.

I have crafted one from scratch based on specific functional requirements and technical requirements, conforming to my design principles for UI, UX and Developer Experience.

## Requirements

### Functional requirements:
1. Support light and dark themes.
2. Support more than 2 themes, therefore at least 3 themes are available.
3. Support prebuilt themes used by many Web applications, optionally plus an app specific css for colors like `colors.css`, with optional css for dark colors css like `colors-dark.css`.
4. Support dynamically switching among themes.
5. When starting the same Web app/site in the other tab, the explicitly selected theme is used.

### Technical requirements:
1. Reusable across apps.
2. Minimum API surface for the sake of easy to customize and easy to call.
3. Neutral to specific UI design.
4. Must be efficient without causing blinking during startup and switching.
5. Usable in SPA and PWA.
6. Usable in PWA, offline usage and Intranet.
7. Adjustable after build, bundle and deployment. For example, admin can adjust the number and the order of the themes listed, and app specific colors can be adjusted.
8. Themes may be hosted locally or in CDN.
9. Selecting a theme which is currently loaded won't cause the theme to be loaded again.

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

1. Add themeLoader.ts
2. Add data schema `themeDef.ts` for the themes dictionary in `siteconfig.js`, along with `environment.common.ts` for strongly typed site config during Web app startup.
3. Call `ThemeLoader.loadTheme()` before the bootstrap of the Web app.
4. In the UI component presenting the theme picker, convert the themes dictionary to an array which will be used to present the list. And call `ThemeLoader.loadTheme()` when the picker picks a theme.
5. Prepare `siteconfig.js`.
6. In index.html, add `<script src="conf/siteconfig.js"></script>` .

### Web Sites and Apps that Use ThemeLoader

* [Angular Material Components Extension](https://zijianhuang.github.io/nmce/en/)
* [JsonToTable](https://zijianhuang.github.io/json2table/)
* [Personal Blog](https://zijianhuang.github.io/poets)

## Alternative Implementation by Angular Material Documentation

After Angular Material Components v12, the documentation site has been merged into the components' repository.

Please check https://github.com/angular/components/blob/main/docs/src/app/shared/theme-picker/ and https://github.com/angular/material.angular.io/blob/main/src/app/shared/style-manager/ . 

## Alternative Designs by AI Code Generators

