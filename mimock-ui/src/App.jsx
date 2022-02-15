import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'styles';
import './index.css';

const num = 1;

const App = () => (
	<div className='mt-10 text-3xl mx-auto max-w-6xl'>
		<div>Name: mimock-ui</div>
		<div>Framework: react</div>
		<div>Language: JavaScript</div>
		<div>CSS: Tailwind</div>
		<If condition={false}>
			<span>IfBlock</span>
		</If>
		<Button label={"Click me!"}></Button>
	</div>
);

ReactDOM.render(<App />, document.getElementById('app'));
