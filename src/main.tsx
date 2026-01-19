import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app';
import LangProvider from '@/app/providers/LangProvider';

import '@/assets/styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<LangProvider>
			<App />
		</LangProvider>
	</StrictMode>,
);
