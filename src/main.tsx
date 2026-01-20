import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import LangProvider from '@/app/providers/LangProvider';

import App from '@/app';

import '@/assets/styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<LangProvider>
			<App />
		</LangProvider>
	</StrictMode>,
);
