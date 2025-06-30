import { defineStore } from 'pinia';
import pinia from '@/stores';

const useBreadcrumbStore = defineStore('breadcrumb', {
	state: () => ({
		parentRoute: [] as string[]
	}),
	actions: {
		setParentRoute(title: string[]) {
			this.parentRoute = title;
		}
	}
});

export default function useBreadcrumb() {
	return useBreadcrumbStore(pinia);
}
