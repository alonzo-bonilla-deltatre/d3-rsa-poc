/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

// Tailwind default config reference https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        content: ['var(--font-content)'],
        navigation: ['var(--font-navigation)'],
        heading: ['var(--font-heading)'],
      },
      fontSize: {
        // 'xl': ['16px', '18px'],
        '1.5xl': ['20px', '22px'],
        '2.3xl': ['22px', '24px'],
        '2.5xl': ['28px', '32px'],
        '4.5xl': ['40px', '42px'],
        //'8xl': ['120px', '96px'],
        '8.5xl': ['120px', '96px'],
        // Heading
        'heading-1': [
          '60px', {
            lineHeight: '60px',
            fontWeight: '400',
            letterSpacing: '-1.2px',
          }
        ],
        'heading-1-lg': [
          '120px', {
            lineHeight: '100px',
          }],
        'heading-2': [
          '50px', {
            lineHeight: '40px',
            fontWeight: '400',
          }
        ],
        'heading-2-lg': [
          '100px', {
            lineHeight: '86px',
          }
        ],
        'heading-3': [
          '28px', {
            lineHeight: '40px',
            fontWeight: '400',
          }
        ],
        'heading-3-lg': [
          '40px', {
            lineHeight: '48px',
          }
        ],
        'heading-4': [
          '40px', {
            lineHeight: '36px',
            fontWeight: '400',
          }
        ],
        'heading-4-lg': [
          '44px', {
            lineHeight: '40px',
          }
        ],
        'heading-5': [
          '18px', {
            lineHeight: '18px',
            fontWeight: '700',
          }
        ],
        'heading-5-lg': [
          '22px', {
            lineHeight: '22px',
          }
        ],
        'heading-6': [
          '14px', {
            lineHeight: '20px',
            fontWeight: '700',
          }
        ],
        'heading-6-lg': [
          '20px', {
            lineHeight: '28px',
          }
        ],
        // Content
        'description': [
          '12px', {
            lineHeight: '14px',
            fontWeight: '400',
          }
        ],
        'description-lg': [
          '16px', {
            lineHeight: '18px',
          }
        ],
        'body-xsmall': [
          '12px', {
            lineHeight: '13px',
            fontWeight: '500',
          }
        ],
        'body-xsmall-lg': [
          '14px', {
            lineHeight: '18px',
          }
        ],
        'body-small': [
          '14px', {
            lineHeight: '18px',
            fontWeight: '500',
          }
        ],
        'body-small-lg': [
          '16px', {
            lineHeight: '22px',
          }
        ],
        'body-medium': [
          '16px', {
            lineHeight: '20px',
            fontWeight: '500',
          }
        ],
        'body-medium-lg': [
          '18px', {
            lineHeight: '22px',
          }
        ],
        'body-large': [
          '18px', {
            lineHeight: '22px',
            fontWeight: '700',
          }
        ],
        'body-large-lg': [
          '22px', {
            lineHeight: '28px',
          }
        ],
        'tag-small': [
          '12px', {
            lineHeight: '14px',
            fontWeight: '600',
            letterSpacing: '-0.12px',
          }
        ],
        'tag-large': [
          '12px', {
            lineHeight: '14px',
            fontWeight: '700',
          }
        ],
        'tag-large-lg': [
          '14px', {
            lineHeight: '16px',
          }
        ],
        'quote': [
          '28px', {
            lineHeight: '32px',
            fontWeight: '500',
          }
        ],
        'quote-lg': [
          '36px', {
            lineHeight: '48px',
          }
        ],
        'caption': [
          '16px', {
            lineHeight: '20px',
            fontWeight: '400',
          }
        ],
        'caption-lg': [
          '20px', {
            lineHeight: '24px',
          }
        ],
        'caption-medium': [
          '24px', {
            lineHeight: '30px',
            fontWeight: '400',
          }
        ],
        'caption-medium-lg': [
          '30px', {
            lineHeight: '34px',
            fontWeight: '400',
          }
        ],
        'caption-large': [
          '34px', {
            lineHeight: '40px',
            fontWeight: '400',
          }
        ],
        'caption-large-lg': [
          '40px', {
            lineHeight: '44px',
          }
        ],
        'story-description': [
          '20px', {
            lineHeight: '32px',
            fontWeight: '400',
          }
        ],
        'story-description-lg': [
          '28px', {
            lineHeight: '32px',
            fontWeight: '400',
          }
        ],
        // Navigation
        'navigation-small': [
          '20px', {
            lineHeight: '28px',
            fontWeight: '400',
            letterSpacing: '0.5px',
          }
        ],
        'navigation-large': [
          '20px', {
            lineHeight: '40px',
            fontWeight: '400',
            letterSpacing: '0.6px',
          }
        ],
        'navigation-xlarge': [
          '24px', {
            lineHeight: '40px',
            fontWeight: '400',
            letterSpacing: '0.6px',
          }
        ],
        'navigation-xlarge-lg': [
          '28px', {
            lineHeight: '40px',
          }
        ],
        // Global
        'select': [
          '18px', {
            lineHeight: '28px',
            fontWeight: '700',
          }
        ],
        'ascent': [
          '12px', {
            lineHeight: '14px',
            fontWeight: '700',
          }
        ],
        'cta-small': [
          '22px', {
            lineHeight: '26px',
            fontWeight: '600',
          }

        ],
        'cta-large': [
          '24px', {
            lineHeight: '28px',
          }
        ],
        'footer-large': [
          '20px', {
            lineHeight: '20px',
            fontWeight: '400',
          }
        ],
        'footer-small': [
          '18px', {
            lineHeight: '20px',
            fontWeight: '500',
          }
        ],
      },
      spacing: {
        'header-height': '71px'
      },
      colors: {
        error: {
          dark: 'var(--color-red)',
          light: 'var(--color-red)',
        },
        accent: 'var(--color-red)',
        'grey-900': 'var(--color-grey-900)',
        'grey-500': 'var(--color-grey-500)',
        'grey-300': 'var(--color-grey-300)',
        'grey-400': 'var(--color-grey-400)',
        'grey-200': 'var(--color-grey-200)',
        'grey-100': 'var(--color-grey-100)',
        'grey-50': 'var(--color-grey-50)',
        gold: 'var(--color-gold)',
        greyscale: {
          dark: 'var(--color-grey-900)',
          grey: 'var(--color-grey-500)',
          light: 'var(--color-grey-300)',
          pale: 'var(--color-grey-100)',
          'off-white': 'var(--color-greyscale-off-white)',
          white: 'var(--color-white)',
        },
        'body': 'var(--d3-theme-component_common_body_background_color, var(--color-component_common_body_background))',
        'dark-body': 'var(--d3-theme-component_commons_dark_body_background_color, var(--color-component_commons_dark_body_background))',
        'dark-text': 'var(--d3-theme-component_commons_dark_text_color, var(--color-component_commons_dark_text))',
        'light-text': 'var(--d3-theme-component_commons_light_text_color, var(--color-component_commons_light_text))',
        component: {
          layout: {
            footer: {
              text: {
                light: 'var(--d3-theme-component_layout_footer_text_light_color, var(--color-component_layout_footer_text_light))',
                dark: 'var(--d3-theme-component_layout_footer_text_dark_color, var(--color-component_layout_footer_text_dark))',                
              },
              background: {
                light: 'var(--d3-theme-component_layout_footer_background_light_color, var(--color-component_layout_footer_background_light))',
                dark: 'var(--d3-theme-component_layout_footer_background_dark_color, var(--color-component_layout_footer_background_dark))',
              },
              border: {
                light: 'var(--d3-theme-component_layout_footer_border_light_color, var(--color-component_layout_footer_border_light))',
                dark: 'var(--d3-theme-component_layout_footer_border_dark_color, var(--color-component_layout_footer_border_dark))',
              },
              'social-icon': {
                light: 'var(--d3-theme-component_layout_footer_social_icon_light_color, var(--color-component_layout_footer_social_icon_light))',
                dark: 'var(--d3-theme-component_layout_footer_social_icon_dark_color, var(--color-component_layout_footer_social_icon_dark))',
                hover: 'var(--d3-theme-component_layout_footer_social_icon_hover_color, var(--color-component_layout_footer_social_icon_hover))',
              },
              copyright: {
                light: 'var(--d3-theme-component_layout_footer_copyright_light_color, var(--color-component_layout_footer_copyright_light))',
                dark: 'var(--d3-theme-component_layout_footer_copyright_dark_color, var(--color-component_layout_footer_copyright_dark))',
              },
            },
            hamburger: {
              text: {
                light: 'var(--d3-theme-component_layout_hamburger_text_light_color, var(--color-component_layout_hamburger_text_light))',
                dark: 'var(--d3-theme-component_layout_hamburger_text_dark_color, var(--color-component_layout_hamburger_text_dark))',
              },
              background: {
                light: 'var(--d3-theme-component_layout_hamburger_background_light_color, var(--color-component_layout_hamburger_background_light))',
                dark: 'var(--d3-theme-component_layout_hamburger_background_dark_color, var(--color-component_layout_hamburger_background_dark))',
              },
              border: {
                light: 'var(--d3-theme-component_layout_hamburger_border_light_color, var(--color-component_layout_hamburger_border_light))',
                dark: 'var(--d3-theme-component_layout_hamburger_border_dark_color, var(--color-component_layout_hamburger_border_dark))',
              },
              'social-icon': {
                light: 'var(--d3-theme-component_layout_hamburger_social_icon_light_color, var(--color-component_layout_hamburger_social_icon_light))',
                dark: 'var(--d3-theme-component_layout_hamburger_social_icon_dark_color, var(--color-component_layout_hamburger_social_icon_dark))',
                hover: 'var(--d3-theme-component_layout_hamburger_social_icon_hover_color, var(--color-component_layout_hamburger_social_icon_hover))',
              },              
            },
            'cta-list': {
              text: {
                light: 'var(--d3-theme-component_layout_cta_list_text_light_color, var(--color-component_layout_cta_list_text_light))',
                dark: 'var(--d3-theme-component_layout_cta_list_text_dark_color, var(--color-component_layout_cta_list_text_dark))',
              },
              background: {
                dark: 'var(--d3-theme-component_layout_cta_list_background_dark_color, var(--color-component_layout_cta_list_background_dark))',
              },
            },
            section: {
              text: {
                light: 'var(--d3-theme-component_layout_section_text_light_color, var(--color-component_layout_section_text_light))',
                dark: 'var(--d3-theme-component_layout_section_text_dark_color, var(--color-component_layout_section_text_dark))',
              },
              background: {
                dark: 'var(--d3-theme-component_layout_hamburger_section_dark_color, var(--color-component_layout_section_background_dark))',
              },
            },
            'dynamic-grid': {
              text: {
                light: 'var(--d3-theme-component_layout_dynamic_grid_text_light_color, var(--color-component_layout_dynamic_grid_text_light))',
                dark: 'var(--d3-theme-component_layout_dynamic_grid_text_dark_color, var(--color-component_layout_dynamic_grid_text_dark))',
              },
              background: {
                dark: 'var(--d3-theme-component_layout_dynamic_grid_background_dark_color, var(--color-component_layout_dynamic_grid_background_dark))',
              },
            },
          },
          module: {
            hero: {
              title: 'var(--d3-theme-component_module_hero_title_color, var(--color-component_module_hero_title))',
              'pagination-border': 'var(--d3-theme-component_module_hero_pagination_border_color, var(--color-component_module_hero_pagination_border))',
              'progress-bar-color': 'var(--d3-theme-component_module_hero_progress_bar_color, var(--color-component_module_hero_progress_bar_color))',
              'progress-bar-background': 'var(--d3-theme-component_module_hero_progress_bar_background_color, var(--color-component_module_hero_progress_bar_background))',
            },
            'hero-static': {
              title: 'var(--d3-theme-component_module_hero_static_title_color, var(--color-component_module_hero_static_title))',
              roofline: 'var(--d3-theme-component_module_hero_static_roofline_color, var(--color-component_module_hero_static_roofline))',
              date: 'var(--d3-theme-component_module_hero_static_date_color, var(--color-component_module_hero_static_date))',
            },
            menu: {
              hover: 'var(--d3-theme-component_module_menu_hover_color, var(--color-component_module_menu_hover))',
              'enhanced-title': 'var(--d3-theme-component_module_menu_enhanced_title_color, var(--color-component_module_menu_enhanced_title))',
            }
          },
          commons: {
            'common-header': {
              text: {
                light: 'var(--d3-theme-component_commons_common_header_text_light_color, var(--color-component_commons_common_header_text_light))',
                dark: 'var(--d3-theme-component_commons_common_header_text_dark_color, var(--color-component_commons_common_header_text_dark))',
              },
              background: {
                light: 'var(--d3-theme-component_commons_common_header_background_light_color, var(--color-component_commons_common_header_background_light))',
                dark: 'var(--d3-theme-component_commons_common_header_background_dark_color, var(--color-component_commons_common_header_background_dark))',
              },
            },
            'header-title': {
              light: 'var(--d3-theme-component_commons_header_title_light_color, var(--color-component_commons_header_title_light))',
              dark: 'var(--d3-theme-component_commons_header_title_dark_color, var(--color-component_commons_header_title_dark))',
            },
            'language-switcher': {
              text: {
                light: 'var(--d3-theme-component_common_language_switcher_text_light_color, var(--color-component_common_language_switcher_text_light))',
                dark: 'var(--d3-theme-component_common_language_switcher_text_dark_color, var(--color-component_common_language_switcher_text_dark))',
              },
              separator: 'var(--d3-theme-component_common_language_switcher_separator_color, var(--color-component_common_language_switcher_separator))',
              hover: 'var(--d3-theme-component_common_language_switcher_hover_color, var(--color-component_common_language_switcher_hover))',
            },
          },
        },
      },
      backgroundImage: {
        'bullets': "url('/assets/bg-bullets.png')",
        'bullets-logo': "url('/assets/bg-bullets-logo.svg')",
        'dark-body-image': "url('/assets/stone.png')",
        'article-header': "url('/assets/article-header-background.svg')",
        'article-header-dark': "url('/assets/article-header-background-dark.png')",
        'line-divider': "url('/assets/line-divider.svg')",
      },
      boxShadow: {
        'hamburger-light': '0 -6px 9px 0 rgba(0,0,0,0.20)',
        'hamburger-dark': '0 -6px 9px 0 rgba(255,255,255,0.20)',
      },
    },
  },
  safelist: ['items-start', 'items-center', 'items-end', 'col-span-2', 'row-span-2'],
  // disable core .container
  corePlugins: {
    container: false,
  },
  // custom .container max-width and padding - https://stackoverflow.com/a/70011691/1498848
  plugins: [
    plugin(function ({addComponents}) {
      addComponents({
        '.container': {
          'width': '100%',
          'max-width': '1584px',
          'margin-right': 'auto',
          'margin-left': 'auto',
          'padding-right': '16px',
          'padding-left': '16px',
          '@screen md': {
            'padding-right': '24px',
            'padding-left': '24px',
          },
          '@screen xl': {
            'padding-right': '48px',
            'padding-left': '48px',
          },
        },
      })
    }),
    plugin(function ({addVariant}) {
      addVariant("grid-container-col-span-1", ".grid-container .col-span-1 &");
      addVariant("grid-container-grid-child-little-space", ".grid-container .grid-child-little-space &");
      addVariant("hamburger-navigation", ".hamburger-navigation &");
      addVariant("story__rel-items", ".story__rel-items &");
      addVariant("squared-sm-full", ".squared-sm-full &");
      addVariant("portrait-full", ".portrait-full &");
      addVariant("landscape-full", ".landscape-full &");
      addVariant("squared", ".squared &");
      addVariant("portrait", ".portrait &");
      addVariant("landscape", ".landscape &");
    })
  ],
  darkMode: 'class',
}
