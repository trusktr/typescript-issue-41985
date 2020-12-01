import {Login} from './index'

describe('authentication-ui', () => {
	describe('<log-in> element', () => {
		let login: Login

		beforeEach(() => {
			// consumer code creates a log-in form
			login = document.createElement('log-in')
			document.body.append(login)
		})

		afterEach(() => {
			login.remove()
		})

		it('provides a Login class for creating <log-in> elements', () => {
			expect(Login).toBeInstanceOf(Function)
			expect(login).toBeInstanceOf(HTMLElement)
			expect(login).toBeInstanceOf(Login)
			expect(login.tagName).toBe('LOG-IN')
		})

		it('passes credentials to consumer code on form submit via the authsubmit event', () => {
			let user: string | undefined, pass: string | undefined

			// consumer code listens for the authsubmit event, triggered when the user click the submit button (or presses enter)
			login.addEventListener('authsubmit', (event: Event) => {
				let e = event as CustomEvent<{username: string; password: string}>
				user = e.detail.username
				pass = e.detail.password
			})

			// user inputs username and password
			const usernameField = login.shadowRoot?.querySelector('input[type=text]') as HTMLInputElement
			usernameField.value = 'john'
			const passwordField = login.shadowRoot?.querySelector('input[type=password]') as HTMLInputElement
			passwordField.value = '1234'

			// user clicks the submit button
			const submitButton = login.shadowRoot?.querySelector('input[type=submit]') as HTMLElement
			submitButton.click()

			// consumer code received the username and password
			expect(user).toBe('john')
			expect(pass).toBe('1234')
		})

		it('shows a specified error message via the errorMessage attribute', () => {
			const errMsg = 'Oh no! Login failed!'
			login.setAttribute('error-message', errMsg)

			expect(login.errorMessage).toBe(errMsg)
			expect(login.shadowRoot?.innerHTML).toContain(errMsg)
		})

		xit('TODO: shows a specified success message via the successMessage attribute', () => {
			// TODO
		})
	})
})
