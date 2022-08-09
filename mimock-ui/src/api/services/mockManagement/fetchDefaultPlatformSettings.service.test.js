import { get } from 'api/AxiosClient';
import { fetchDefaultPlatformSettings } from './fetchDefaultPlatformSettings.service';

jest.mock('api/AxiosClient');

describe('fetchDefaultPlatformSettings.service', () => {
	it('should fetch platform settings', async () => {
		get.mockResolvedValue({
			data: [
				{
					isExportImportEnabled: true,
					isFlushBinCronEnabled: true,
				},
			],
		});

		await fetchDefaultPlatformSettings();

		expect(get).toHaveBeenCalledTimes(1);
		expect(get).toHaveBeenCalledWith('/platform-settings');
	});

	it('when get call fails', async () => {
		get.mockRejectedValue(new Error('error'));

		await fetchDefaultPlatformSettings().catch(() => {
			expect(get).toHaveBeenCalledTimes(1);
			expect(get).toHaveBeenCalledWith('/platform-settings');
		});
	});
});
