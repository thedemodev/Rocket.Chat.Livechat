import { Component } from 'preact';
import SDK from '../../api';
import { Consumer } from '../../store';
import Register from './component';


export class RegisterContainer extends Component {
	handleSubmit = async(fields) => {
		const { dispatch, token } = this.props;

		await dispatch({ loading: true });
		try {
			const user = await SDK.grantVisitor({ visitor: { ...fields, token } });
			await dispatch({ token: user.token, user });
		} finally {
			await dispatch({ loading: false });
		}
	}

	render = (props) => (
		<Register {...props} onSubmit={this.handleSubmit} />
	)
}


export const RegisterConnector = ({ ref, ...props }) => (
	<Consumer>
		{({
			theme: {
				title,
				color,
			} = {},
			strings: {
				registrationFormMessage: message,
			} = {},
			settings: {
				nameFieldRegistrationForm: hasNameField,
				emailFieldRegistrationForm: hasEmailField,
				allowSwitchingDepartments: hasDepartmentField,
			} = {},
			loading = false,
			token,
			dispatch,
		}) => (
			<RegisterContainer
				ref={ref}
				{...props}
				title={title || I18n.t('Need help?')}
				color={color}
				message={message || I18n.t('Please, tell us some informations to start the chat')}
				hasNameField={hasNameField}
				hasEmailField={hasEmailField}
				hasDepartmentField={hasDepartmentField}
				departments={[]}
				loading={loading}
				token={token}
				dispatch={dispatch}
			/>
		)}
	</Consumer>
);


export default RegisterConnector;
