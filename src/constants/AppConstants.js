import {AppImages} from './AppImages';
export const AppConstants = {
  buttonActiveOpacity: 0.7,
  otpTimer: 60,
  imageHeader: {'Content-Type': 'multipart/form-data;'},
  links: {
    termsAndConditionUrl: 'https://moveittech.com/terms-conditions/',
  },
  keys: {
    moveit: 'Moveit',
    movingPackage: 'moving_packing',
    homeTitle: 'home_title',
    homeDescription: 'home_discription',
    movingPackageDescriptions: 'moving_package_discription',
    bookTruckNow: 'book_truck_now',
    bookTruckDescription: 'book_truck_discription',
    b2B: 'b2b',
    b2BDescription: 'b2b_discription',
  },
  packageType: [
    {label: 'Basic Packing ( Single Layering)', value: 1},
    {label: 'Premium Packing ( As Required Layering)', value: 2},
    {label: 'None', value: 3},
  ],

  homeCards: [
    {
      title: 'moving_packing',
      description: 'moving_package_discription',
      disabled: false,
      image: AppImages.movingRelocationVehicle,
      loading: false,
    },
    {
      title: 'book_truck_now',
      description: 'book_truck_discription',
      disabled: false,
      image: AppImages.smallMoveVehicle,
      loading: false,
    },
  ],
  toastMessages: {
    location: {
      faultyCordinates: 'Your location coordinates are faulty',
      locationPermissionDenied: 'Geolocation permission is denied',
      locationCoordsFaulty: 'Your location coordinates are faulty',
    },
    mustSelectVehicle: 'You Must Select Vehicle in order to proceed forward',
    selectedAbove50mb:
      'File Selected is above 50mb please select different file',
    sizeExceeded:
      'Images/Videos size should be below 50mb kindly remove some files',
    accountDeleteMessage: 'Account will be deleted with in 15 days',
    fileTooLarge: 'File Too Large Kindly select any other file',
  },
  screens: {
    ContactDetails: 'ContactDetails',
  },
  PlaceHolder: {
    pickUpAddress: 'Enter the pickup address',
    dropOffAddress: 'Enter the drop-off address',
  },
  uploadLimit: 'Media size is exceeding the allowed limit which is 50MB.',
  damageProtectionOptions: [
    {id: 1, value: '0', label: 'None', amount: 0},
    {
      id: 2,
      value: '3,500',
      label: 'PKR 1 Million of Protection',
      amount: 1_000_000,
    },
    {
      id: 3,
      value: '7,000',
      label: 'PKR 2 Million of Protection',
      amount: 2_000_000,
    },
    {
      id: 4,
      value: '10,500',
      label: 'PKR 4 Million of Protection',
      amount: 4_000_000,
    },
    {id: 5, value: '0', label: 'Other', amount: null},
  ],
  quoteDetails: {
    transportCharges: 'PKR 30,000-PKR 35,000',
    loadingCharges: 'PKR 10,000-PKR 15,000',
    packingCharges: 'PKR 20,000-PKR 25,000',
    additionalServices: 'PKR 5,000-PKR 8,000',
    assemblingServices: 'PKR 2,000-PKR 3,000',
    serviceCharges: 'PKR 4,000-PKR 5,000',
    taxAmount: 'PKR 6,000-PKR 8,000',
    estimatedAmount: 'PKR 70,000 - PKR 80,000',
  },
  revisedQuoteDetails: {
    transportCharges: 'PKR 30,000',
    loadingCharges: 'PKR 10,000',
    packingCharges: 'PKR 20,000',
    additionalServices: 'PKR 5,000',
    assemblingServices: 'PKR 2,000',
    serviceCharges: 'PKR 4,000',
    taxAmount: 'PKR 6,000',
    discountedAmount: 'PKR 8,000',
    estimatedAmount: 'PKR 80,000',
  },
  relocationCalendarLocale: {
    monthNames: [
      'January, ',
      'February, ',
      'March, ',
      'April',
      'May, ',
      'June, ',
      'July, ',
      'August, ',
      'September, ',
      'October, ',
      'November, ',
      'December, ',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: 'Today',
  },
  sameCityModalData: [
    {
      heading: 'Premium Packing',
      description:
        'Our top-tier option ensures the highest level of protection for your belongings. With professional packing crews, specialized techniques for fragile items, and a full-service option, we handle every aspect of packing for a stress-free move',
      Icon: AppImages.premiumIcon,
    },
    {
      heading: 'Basic Packing',
      description:
        'Efficient and reliable, our Basic Packaging service includes industry-standard materials, a skilled packing crew, and standard techniques suitable for most items. You have the flexibility to choose a partial packing service that fits your needs',
      Icon: AppImages.basicIcon,
    },
    {
      heading: 'None (Self-Pack)',
      description: `For a hands-on approach, choose our Self-Pack option. You take full control of the packing process, following our provided guidelines. While offering flexibility, it's important to note that with Self-Pack, you assume responsibility for any potential damages during the move`,
      Icon: AppImages.noneIcon,
    },
  ],
  otherCityModalData: [
    {
      heading: 'Premium Packing',
      description:
        'Our top-tier option ensures the highest level of protection for your belongings. With professional packing crews, specialized techniques for fragile items, and a full-service option, we handle every aspect of packing for a stress-free move',
      Icon: AppImages.premiumIcon,
    },
    {
      heading: 'None (Self-Pack)',
      description: `For a hands-on approach, choose our Self-Pack option. You take full control of the packing process, following our provided guidelines. While offering flexibility, it's important to note that with Self-Pack, you assume responsibility for any potential damages during the move`,
      Icon: AppImages.noneIcon,
    },
  ],
  insuranceTypesModalData: [
    {
      heading: 'Know About Insurance',
      description:
        'Ensure your fragile items are covered during your move. Review and choose from our options for peace of mind. If none align with your needs, input your preferred coverage value. Expect a call from our customer support team for further details.',
      Icon: AppImages.premiumIcon,
    },
  ],
  customMapStyles: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ],
  confirmAddressTooltipText: [
    {
      title:
        'Please carefully check the pickup & drop-off addresses you’ve entered. Confirm to proceed or edit if needed!',
    },
  ],
  pickupPropertyDetailAddressTooltipText: [
    {
      title:
        'Please enter the precise address details of your pickup, e.g. house no., street no., building name etc to help us locate you accurately!',
    },
  ],
  pickupPropertyDetailPropertyTypeTooltipText: [
    {
      title:
        'Choose the type of property for the pickup. Then, provide additional details for us to give a more precise quotation.',
    },
  ],
  dropOffPropertyDetailAddressTooltipText: [
    {
      title:
        'Please enter the precise address details of your drop-off, e.g. house no., street no., building name etc to help us locate you accurately!',
    },
  ],
  dropOffPropertyDetailPropertyTypeTooltipText: [
    {
      title:
        'Choose the type of property for the drop-off. Then, provide additional details for us to give a more precise quotation.',
    },
  ],
  relocationItemCategoryTooltipText: [
    {
      title: 'Search and add missing items for an accurate quote',
    },
    {
      title:
        'Browse categories, select items – choices impact the final quotation!',
    },
  ],
  relocationPickUpTooltipText: [
    {
      title: `Let's get started! First, choose the address you're moving from!`,
    },
  ],
  relocationDropOffTooltipText: [
    {
      title: 'Please select the address you’re going to move to!',
    },
  ],
  relocationEstimateQouteTooltipText: [
    {
      title: `Review your cost breakdown, choose insurance for peace of mind, and customize coverage if needed. Confirm details with 'Book Move' or opt for an on-site survey for an exact quote`,
    },
  ],
  relocationEstimateSurveyQouteTooltipText: [
    {
      title: `Review your cost breakdown and confirm details with 'Book Move'. You can also opt for an on-site survey for an exact quote.`,
    },
  ],
  relocationEstimateQouteBtnTooltipText: [
    {
      title: `Pick a schedule that best fits your plans, & we'll take care of the rest. Once you select these, your move will be officially booked with us!`,
    },
  ],
  additionalServicePackingTypeTooltipText: [
    {
      title:
        'Need packing assistance? Select your packing type from our options to avoid any damages during the move!',
    },
  ],
  additionalServiceLoadingTooltipText: [
    {
      title: `Whether it's loading and unloading your belongings or assembling & disassembling items like beds & tables, your choices will be seamlessly handled by us.`,
    },
  ],
  additionalServiceAcInstallationTooltipText: [
    {
      title:
        'Need a technician for safe & precise AC removal at your old location & installation at your new one? Please select this service and specify the quantity of air conditioners for both removal & installation.',
    },
  ],
  additionalServiceAdditionalDetailsTooltipText: [
    {
      title:
        'If there’s an item you couldn’t locate in our categories, please let us know. Your feedback will help us improve the user experience for everyone!',
    },
  ],

  relocationSpaces: [
    {
      id: 1,
      count: 0,
      image: AppImages.bedrooms,
      name: 'bedroom',
      bedrooms_packing: 0,
      info: 'A bedroom usually consists of a double bed set (including mattress) with side tables, Chester, 2 side table lamps, 2 chairs and a table.'
    },
    {
      id: 2,
      count: 0,
      image: AppImages.lounge,
      name: 'lounge',
      lounge_packing: 0,
      info: 'A lounge usually consists of a 5-7 seater sofa, side tables with lamps, a center table, a TV   and console, as well as wall hangings, lamps, and some decor items.'
    },
    {
      id: 3,
      count: 0,
      image: AppImages.kitchen,
      name: 'kitchen',
      kitchen_packing: 0,
      info: 'A kitchen usually covers up to 10-12 crockery cartons, electronics and a few small cartons.'
    },
    {
      id: 4,
      count: 0,
      image: AppImages.drawingRoom,
      name: 'drawing',
      drawing_packing: 0,
      info: 'A drawing room usually consists of a 7-seater sofa set, including side and center tables, wall hangings, decorative pieces (including fragile items), lamps and rugs etc.'
    },
    {
      id: 5,
      count: 0,
      image: AppImages.diningRoom,
      name: 'dining',
      dining_packing: 0,
      info: 'A dining room usually consists of a 6-8 seater dining table with chairs, a sideboard chest, wall hangings and 3-5 crockery cartons.'
    },
  ],
};
