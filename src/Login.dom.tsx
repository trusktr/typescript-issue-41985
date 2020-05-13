import {Element, css, input, reactive, attribute} from '@lume/element'
import * as loginBg from './assets/images/Login-Screen_BG.jpg'
import * as loginHeader from './assets/images/Login_Logo-Header-01.svg'

export interface LoginAttributes extends JSX.HTMLAttributes<Login> {
	authenticating?: boolean
	// TODO jpea, hook these up. If a message is provided, then show it.
	errorMessage?: string
	successMessage?: string
}

export class Login extends Element {
	@reactive @attribute authenticating = false

	#user?: HTMLInputElement
	#pass?: HTMLInputElement

	#onFormSubmit = async (e: Event) => {
		// TODO jpea, allow default form behavior if someone wants it.
		e.preventDefault()

		if (!this.#user || !this.#pass) throw new Error('Not possible!')

		this.dispatchEvent(
			new CustomEvent('submit', {
				detail: {
					username: this.#user.value,
					password: this.#pass.value,
				},
			}),
		)
	}

	template = (
		<div class="login-container">
			<div class="login-wrap">
				<div class="form-block w-form">
					<form name="email-form" data-name="Email Form" class="form" onSubmit={this.#onFormSubmit}>
						{
							(this.#user = input(
								<input
									type="text"
									class="text-field w-input"
									name="Email"
									data-name="Email"
									placeholder="Email"
								/>,
							))
						}
						{
							(this.#pass = input(
								<input
									type="password"
									class="text-field w-input"
									name="Password"
									data-name="Password"
									placeholder="Password"
									required={true}
								/>,
							))
						}
						<p class="paragraph">
							<a href="#" class="link">
								Don't remember your password?
							</a>
						</p>
						<input
							type="submit"
							value="Login"
							data-wait="Please wait..."
							class="submit-button w-button"
							disabled={this.authenticating}
						/>
					</form>
					<div class="w-form-done">
						<div>Thank you! Your submission has been received!</div>
					</div>
					<div class="w-form-fail">
						<div>Oops! Something went wrong while submitting the form.</div>
					</div>
				</div>
			</div>
		</div>
	)

	static css = css`
		/* Default Webflow styles */
		.w-form {
			margin: 0 0 15px;
		}
		.w-form-done {
			display: none;
			padding: 20px;
			text-align: center;
			background-color: #dddddd;
		}
		.w-form-fail {
			display: none;
			margin-top: 10px;
			padding: 10px;
			background-color: #ffdede;
		}
		.w-input,
		.w-select {
			display: block;
			width: 100%;
			height: 38px;
			padding: 8px 12px;
			margin-bottom: 10px;
			font-size: 14px;
			line-height: 1.428571429;
			color: #333333;
			vertical-align: middle;
			background-color: #ffffff;
			border: 1px solid #cccccc;
		}
		.w-input:-moz-placeholder,
		.w-select:-moz-placeholder {
			color: #999;
		}
		.w-input::-moz-placeholder,
		.w-select::-moz-placeholder {
			color: #999;
			opacity: 1;
		}
		.w-input:-ms-input-placeholder,
		.w-select:-ms-input-placeholder {
			color: #999;
		}
		.w-input::-webkit-input-placeholder,
		.w-select::-webkit-input-placeholder {
			color: #999;
		}
		.w-input:focus,
		.w-select:focus {
			border-color: #3898ec;
			outline: 0;
		}
		.w-input[disabled],
		.w-select[disabled],
		.w-input[readonly],
		.w-select[readonly],
		fieldset[disabled] .w-input,
		fieldset[disabled] .w-select {
			cursor: not-allowed;
			background-color: #eeeeee;
		}
		textarea.w-input,
		textarea.w-select {
			height: auto;
		}
		.w-button {
			display: inline-block;
			padding: 9px 15px;
			background-color: #3898ec;
			color: white;
			border: 0;
			line-height: inherit;
			text-decoration: none;
			cursor: pointer;
			border-radius: 0;
		}
		input.w-button {
			-webkit-appearance: button;
		}

		/* Custom styles (from Kyle in Webflow) */
		.login-container {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			flex-wrap: nowrap;
			align-items: center;
			background-image: url(${loginBg});
			background-position: 50% 50%;
			background-size: cover;
		}

		.login-wrap {
			/**/
			width: 432px;
			min-height: 400px;
			padding-top: 56px;
			padding-right: 32px;
			padding-left: 32px;
			border-radius: 12px;
			background-color: #0038a5;
			background-image: url(${loginHeader});
			background-position: 0px 0px;
			background-repeat: no-repeat;
			background-attachment: scroll;
		}

		.text-field {
			margin-bottom: 24px;
			padding-top: 24px;
			padding-bottom: 24px;
			border-radius: 4px;
			text-align: center;
			box-sizing: border-box;
		}

		.text-field-2 {
			margin-bottom: 12px;
			padding-top: 24px;
			padding-bottom: 24px;
			border-radius: 4px;
		}

		.text-field:hover,
		.text-field-2:hover,
		.text-field:focus,
		.text-field-2:focus {
			box-shadow: rgba(255, 255, 255, 0.4) 0px 0px 0px 4px;

			/* This undoes Webflow's default focus border-color setting which had a blueish color. */
			border-color: #777;
		}

		.submit-button {
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			bottom: auto;
			display: inline-block;
			min-width: 232px;
			margin-top: 24px;
			padding: 12px 16px;
			border-radius: 4px;
			background-color: #fff;
			color: #0038a5;
			font-size: 22px;
			line-height: 22px;
			text-align: center;
			-o-object-fit: fill;
			object-fit: fill;
			-o-object-position: 50% 50%;
			object-position: 50% 50%;
		}

		.submit-button:disabled {
			opacity: 0.5;
		}

		.form {
			display: block;
			margin-top: 0px;
			margin-bottom: 0px;
		}

		.paragraph {
			margin-bottom: 0px;
			color: #94b8ff;
			font-size: 16px;
			line-height: 24px;
			text-align: center;
		}

		.link {
			color: #94b8ff;
		}

		.form-block {
			display: block;
			margin-top: 120px;
			margin-bottom: 32px;
		}

		.image {
			width: auto;
			-o-object-fit: fill;
			object-fit: fill;
		}
	`
}

customElements.define('log-in', Login)

/* eslint-disable typescript/no-namespace */
declare global {
	interface HTMLElementTagNameMap {
		'log-in': Login
	}
}

// Don't forget to also register the name for TypeScript recognize it as a valid
// JSX tag name (this will get easier in the future, WIP by the TS team)
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'log-in': LoginAttributes
		}
	}
}
