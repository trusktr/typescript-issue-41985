import {Login} from './index'

describe('variable', () => {
	it('needs testing', () => {
		expect(Login).toBeInstanceOf(Function)

		const login = document.createElement('log-in')
		expect(login).toBeInstanceOf(Login)

		let user: string, pass: string

		login.addEventListener('submit', (e: any) => {
			user = e.detail.username
			pass = e.detail.password
		})

		const submit = login.shadowRoot?.querySelector('input[type=submit]')
		submit?.dispatchEvent(
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				composed: true,
				button: 0,
				// clientX?: number;
				// clientY?: number;
				// movementX?: number;
				// movementY?: number;
				// relatedTarget?: EventTarget | null;
				// screenX?: number;
				// screenY?: number;
			}),
		)

		expect(user!).toBe('')
		expect(pass!).toBe('')
	})
})
