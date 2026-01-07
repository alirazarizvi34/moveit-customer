export const colorConstants = {
  darkPurple: '#4E008A',
  darkYellow: '#FFBE50',
  darkBlack: '#070707',
  darkGray: '#6F7070',
  darkGreen: '#3A691E',
  darkBlue: '#0359FF',
  darkRed: '#D21A10',
  lightGray: '#F5F5F5',
  lightRed: '#F9DEDC',
  lightPurple: '#F7EDFF',
  lightGreen: '#D2FFBA',
  lightBlue: '#ECF2FF',
  lightYellow: '#FFDFA9',
  white: '#FFFFFF',
  mediumGray: '#E3E3E3',
  simpleGray: '#C9C9C9',
  magnolia: '#FDFBFF',
  thistleLight: '#D0BDDF',
  lightPink: '#F8EEFF',
  lavenderMist: '#F1E1FE'
};

const textColor = {
  primaryText: colorConstants.darkPurple,
  secondaryText: colorConstants.darkYellow,
  defaultText: colorConstants.darkBlack,
  errorText: colorConstants.darkRed,
  disableText: colorConstants.simpleGray,
  placeholderText: colorConstants.darkGray,
  whiteText: colorConstants.white,
  darkGrayText: colorConstants.darkGray,
  infoText: colorConstants.darkBlue,
};

const backgroundColor = {
  primaryBackground: colorConstants.darkPurple,
  secondaryBackground: colorConstants.darkYellow,
  defaultBackground: colorConstants.white,
  errorBackground: colorConstants.lightRed,
  disableBackground: colorConstants.simpleGray,
  lightGrayBackground: colorConstants.lightGray,
  darkGrayBackgrounud: colorConstants.darkGray,
  lightPurpleBackground: colorConstants.lightPurple,
  magnoliaBackground: colorConstants.magnolia,
  drawerPinkBackground:"#FBF7FF",
  varningBackground: colorConstants.lightYellow,
  lightPinkBackground : colorConstants.lightPink,
  stepsBackground:"#F9F2FE",
  toolTipInfoBackground: '#FFEBC9',
  lavenderMistBackground: colorConstants.lavenderMist
};

const borderColor = {
  primaryBorder: colorConstants.darkPurple,
  secondaryBorder: colorConstants.darkYellow,
  defaultBorder: colorConstants.mediumGray,
  errorBorder: colorConstants.darkRed,
  lightGrayBorder: colorConstants.lightGray,
  darkGrayBorder: colorConstants.darkGray,
  darkBlackBorder: colorConstants.darkBlack,
  thistleLightBorder: colorConstants.thistleLight
};

export const colorTheme = {...textColor, ...backgroundColor, ...borderColor};
