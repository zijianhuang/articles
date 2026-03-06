# Automate Your Full-stack development on ASP.NET Core Web API and Angular without AI

## User Story

As a full stack software developer, after developing ASP.NET Web API with data validations in the Web API bindings, I would like the SPA on Angular framework to have client side validations to reduce round trips related data error and improvement user experience.

## Functional requirements.

1. When user input invalidate data, the GUI should respond with warning or error message.
2. Invalid data cannot be submitted to the backend.

## Technical requirements

1. Strictly typed reactive forms.
2. Use built-in validators along with FormControl.
3. Develop custom validators if necessarily.
4. Look for 3rd party solutions including AI code agent before hand-crafting codes. For example, the 3rd party code generator or AI should transform some validation attributes of .NET to validators of Angular.

## Solution with WebApiClientGen

## Example with .NET Integral Types and Validation Attributes


```ts
	export interface IntegralEntity {

		/** Type: byte, 0 to 255 */
		byte?: number | null;

		/** Type: int, -2,147,483,648 to 2,147,483,647 */
		int?: number | null;

		/**
		 * Type: int
		 * Range: inclusive between -1000 and 1000000
		 */
		itemCount?: number | null;

		/** Type: sbyte, -128 to 127 */
		sByte?: number | null;

		/** Type: short, -32,768 to 32,767 */
		short?: number | null;

		/** Type: uint, 0 to 4,294,967,295 */
		uInt?: number | null;

		/** Type: ushort, 0 to 65,535 */
		uShort?: number | null;
	}
	export interface IntegralEntityFormProperties {

		/** Type: byte, 0 to 255 */
		byte: FormControl<number | null | undefined>,

		/** Type: int, -2,147,483,648 to 2,147,483,647 */
		int: FormControl<number | null | undefined>,

		/**
		 * Type: int
		 * Range: inclusive between -1000 and 1000000
		 */
		itemCount: FormControl<number | null | undefined>,

		/** Type: sbyte, -128 to 127 */
		sByte: FormControl<number | null | undefined>,

		/** Type: short, -32,768 to 32,767 */
		short: FormControl<number | null | undefined>,

		/** Type: uint, 0 to 4,294,967,295 */
		uInt: FormControl<number | null | undefined>,

		/** Type: ushort, 0 to 65,535 */
		uShort: FormControl<number | null | undefined>,
	}
	export function CreateIntegralEntityFormGroup() {
		return new FormGroup<IntegralEntityFormProperties>({
			byte: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(256)]),
			int: new FormControl<number | null | undefined>(undefined, [Validators.min(-2147483648), Validators.max(2147483647)]),
			itemCount: new FormControl<number | null | undefined>(undefined, [Validators.min(-1000), Validators.max(1000000)]),
			sByte: new FormControl<number | null | undefined>(undefined, [Validators.min(-127), Validators.max(127)]),
			short: new FormControl<number | null | undefined>(undefined, [Validators.min(-32768), Validators.max(32767)]),
			uInt: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(4294967295)]),
			uShort: new FormControl<number | null | undefined>(undefined, [Validators.min(0), Validators.max(65535)]),
		});

	}

