import { layoutConfig } from '@layouts/config'
import { useLayoutConfigStore } from '@layouts/stores/config'
import { _setDirAttr } from '@layouts/utils'

// 🔌 Plugin
export const createLayouts = userConfig => {
  return () => {
    const configStore = useLayoutConfigStore()


    // Non reactive Values
    layoutConfig.app.title = userConfig.app?.title ?? layoutConfig.app.title
    layoutConfig.app.logo = userConfig.app?.logo ?? layoutConfig.app.logo
    layoutConfig.app.overlayNavFromBreakpoint = userConfig.app?.overlayNavFromBreakpoint ?? layoutConfig.app.overlayNavFromBreakpoint
    layoutConfig.app.i18n.enable = userConfig.app?.i18n?.enable ?? layoutConfig.app.i18n.enable
    layoutConfig.app.iconRenderer = userConfig.app?.iconRenderer ?? layoutConfig.app.iconRenderer
    layoutConfig.verticalNav.defaultNavItemIconProps = userConfig.verticalNav?.defaultNavItemIconProps ?? layoutConfig.verticalNav.defaultNavItemIconProps
    layoutConfig.icons.chevronDown = userConfig.icons?.chevronDown ?? layoutConfig.icons.chevronDown
    layoutConfig.icons.chevronRight = userConfig.icons?.chevronRight ?? layoutConfig.icons.chevronRight
    layoutConfig.icons.close = userConfig.icons?.close ?? layoutConfig.icons.close
    layoutConfig.icons.verticalNavPinned = userConfig.icons?.verticalNavPinned ?? layoutConfig.icons.verticalNavPinned
    layoutConfig.icons.verticalNavUnPinned = userConfig.icons?.verticalNavUnPinned ?? layoutConfig.icons.verticalNavUnPinned
    layoutConfig.icons.sectionTitlePlaceholder = userConfig.icons?.sectionTitlePlaceholder ?? layoutConfig.icons.sectionTitlePlaceholder

    // Reactive Values (Store)
    configStore.$patch({

      // isAppRTL: userConfig.app?.isRTL ?? config.app.isRTL,
      isLessThanOverlayNavBreakpoint: false,
    })

    // _setDirAttr(config.app.isRTL ? 'rtl' : 'ltr')
    _setDirAttr(configStore.isAppRTL ? 'rtl' : 'ltr')
  }
}
export * from './components'
export { layoutConfig }
