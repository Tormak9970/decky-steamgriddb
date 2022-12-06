
import { memo, VFC } from 'react';
import { Tabs, TabsProps } from 'decky-frontend-lib';

import AssetTab from './AssetTab';
import LocalTab from './ManageTab';
import t from './utils/i18n';
import useAssetSearch from './hooks/useAssetSearch';
import { SGDB_ASSET_TYPE_READABLE } from './constants';

const AssetTabs: VFC<{
  currentTab: string,
  onShowTab: TabsProps['onShowTab']
}> = ({ currentTab, onShowTab }) => {
  const { openFilters } = useAssetSearch();

  return (
    <Tabs
      title="SteamGridDB"
      autoFocusContents
      activeTab={currentTab}
      onShowTab={onShowTab}
      tabs={[
        ...Object.keys(SGDB_ASSET_TYPE_READABLE).map((type) => ({
          id: type,
          title: SGDB_ASSET_TYPE_READABLE[type],
          content: <AssetTab assetType={type as SGDBAssetType} />,
          footer: {
            onSecondaryActionDescription: t('Filter'),
            onSecondaryButton: () => openFilters(type as SGDBAssetType)
          }
        })),
        {
          title: t('Manage'),
          content: <LocalTab />,
          id: 'manage',
        }
      ]}
    />
  );
};

export default memo(AssetTabs);