/* eslint-disable max-len */

const messages = {
    appTitle: 'WelcomeTV Central',
    helloText: 'Hello ',
    introText: ', your email id is ',

    emailText: 'E-mail',
    passwordText: 'Password',
    login: 'Login',
    emailError: 'Please enter Email.',
    emailValidError: 'Please enter a valid email.',
    emailEditError: 'email Address can\'t be modified',
    passwordError: 'Please enter Password.',
    authErrorText: '* Wrong email or password, please try again.',
    fbauthErrorText: '* Please login with facebook and try again.',
    googleauthErrorText: '* Please login with google and try again.',
    googleCookieErrorText: '* You have disabled third-party cookies in your browser, please enable them.',

    firstNameText: 'First Name',
    lastNameText: 'Last Name',
    roleText: 'Role',
    emailTextId: 'Email ID',
    tagText: 'Tag',

    tagnameText: 'Tag Name',
    status: 'Status',
    action: 'Action',
    sortUserTip: 'Sort Users by:',

    propertyNameText: 'Property Name',
    PostalCodeTextValue: 'Postal Code',
    searchVideoText: 'Search Video',
    videoNameHint: 'Video Name',
    linkVideos: 'Link Videos',
    searchVideos: 'Search Videos',
    linkedContent: 'Linked Content',
    downloadVideoContent: 'download video',
    thumbnailTitle: 'thumbnail',
    manageVideos: 'Go to Manage Videos',
    locDeclinedText: 'To automatically fill the address based on current location, Enable the ',
    settings: 'Settings',
    locNoCovered1: 'If your location is not covered, please ',
    locNoCovered2: 'fill this survey.',
    locNoCovered3: ' That will help us prioritize locations based on demand.',
    useCurrentLoc: ' Use Current Location',

    firstNameError: 'Please enter your first name.',
    lastNameError: 'Please enter your last name.',
    isEnabledError: 'Please select the user status.',
    roleError: 'Please select the Role.',
    tagNameError: 'Please enter a Tag Name.',
    isActiveError: 'Please select the Tag Name status.',
    searchSubmitError: 'Both the fields can\'t be Empty',
    userDetails: 'User Details',
    updateDetails: 'Update Details',
    saveDetails: 'Save Details',
    enableToolTip: 'Enable the User',
    disableToolTip: 'Disable the User',
    addUserToolTip: 'Add New User',
    editUserToolTip: 'Edit User',
    userDetailsChangeSuccess: 'Your details have been updated successfully.',

    confirmPasswordText: 'Confirm Password',
    confirmPasswordError: 'Please enter the confirm password.',
    samePasswordError: '* Both the passwords must be same.',
    passwordChangeSuccess: 'Your password have been updated successfully.',

    thumbnailManagement: 'Add/Delete Thumbnails',


    cookiesError: '* This website uses third-party cookies. Please enable them using the given link.',
    enableCookie: 'Enable Cookies',
    apiError: '* Some error occurred please try again.',
    apiDemo: 'API Demo',

    loginWith: 'Login with',
    loginFb: 'Log in with Facebook',
    loginGoogle: 'Log in with Google',
    loginEmail: 'Or with email',

    forgotPasswordLabel: 'Forgot Password?',
    closePopUp: 'Close',
    emailAuthSuccess: 'We have sent an email to you with further instructions. Please check your inbox.',
    emailAuthFailure: 'This email is not registered with us, please enter a valid email.',

    resetPasswordLabel: 'Reset Password',
    tokenInvalid: 'Reset password token is invalid, please try again.',
    forgotPasswordSuccess: 'Your password have been successfully updated, please login.',

    registerLabel: 'Register',
    signOut: 'Sign Out',
    signUp: 'Sign Up',
    profile: 'Profile',

    forgotPasswordHeader: 'Enter your e-mail address below to reset your password.',
    submit: 'Submit',

    userProfile: 'User Profile',
    users: 'Users',
    meta: 'Meta Tags',
    device: 'Devices',
    linked: 'Linked',
    notLinked: 'Not Linked',
    enableDeviceText: 'Are you sure you want to enable this device ?',
    disableDeviceText: 'Are you sure you want to disable this device ?',
    enableTagToolTip: 'Enable the Meta Tag',
    disableTagToolTip: 'Disable the Meta Tag',
    addMetatagToolTip: 'Add New Meta Tag',
    editMetaTagToolTip: 'Edit Meta Tag',
    enableMetaTagTip: 'Enable Tag',
    disableMetaTagTip: 'Disable Tag',
    tagAddSuccess: 'Meta Tag Name created successfully',
    tagUpdateSuccess: 'Meta Tag Name updated successfully',
    noTagAdded: 'You have not added any tag so far, please',
    addTagText: 'add',
    noTagText: 'tag.',
    noUserAdded: 'You have not added any user so far, please',
    noPropAdded: 'You have not added any property so far, please',
    noDeviceAdded: 'We currently have no devices to show.',
    noLinkedDevice: 'You have not linked any device with this property. Please',
    noLinkedDeviceSimpleUser: 'No device is currently paired with this property.',
    linkDeviceText: 'link',
    aDeviceText: 'a device',
    unpairDeviceConfirmation: 'Are you sure you want to unpair this device?',
    noUserText: 'user.',
    noPropText: 'property.',
    unpairDeviceTip: 'Unpair Device',
    isDisabledTip: 'Disabled',
    isEnabledTip: 'Enabled',
    disable: 'Disable',
    enable: 'Enable',
    sortTagTip: 'Sort Tags by:',
    form: 'Add/Update Users',
    tagsHeader: 'Add/Update Tags',
    main: 'Main',
    videoUpload: 'Upload Video',
    thumbnailUpload: 'Upload Thumbnail',
    property: 'Manage Property',
    propertyForm: 'Add/Update Property',
    downloadUrls: 'Download Content',
    maxLocalInfoExceedError: 'Cannot link more content to videos',

    pairDeviceContent: 'Please enter the property name in the textbox below for which the device needs to be attached.',
    pairDeviceContent2: 'Didn\'t find your property?',
    pairDeviceContent3: 'Go to',
    pairDeviceContent4: 'Manage Property',
    pairDeviceContent5: 'and click on',
    sortDeviceTip: 'Sort Device by:',
    deviceDetails: 'Device Details',
    propertyDetails: 'Property Details',
    devices: 'Devices',
    deviceKey: 'Device Key',
    deviceKeyText: 'Enter Device Key',
    createdOn: 'Created On',
    linkedOn: 'Linked On',
    connectionType: 'Connection Type',
    captionMode: 'Caption Mode',
    viewDeviceToolTip: 'Device Info',
    pairDeviceToolTip: 'Pair New Device',
    isDisabledDeviceToolTip: 'Device disabled',
    isEnabledDeviceToolTip: 'Device enabled',
    disableDeviceToolTip: 'Disable the device',
    linkedDeviceStatus: 'Device status updated successfully.',
    enableDeviceToolTip: 'Enable the device',
    addDeviceTip: 'Pair Device',
    viewLinkedDeviceTip: 'View Paired Devices',
    deviceAutoComplete: 'Search Property',
    deviceFloatingLabel: 'Enter Property to be searched',
    pairCodeText: 'Enter Pair Code',
    pairDeviceButton: 'Pair Device',
    pairedDevices: 'Paired Devices',
    deviceName: 'Device Name',
    deviceModel: 'Model',
    deviceResolution: 'Resolution',
    deviceWidth: 'Width',
    deviceHeight: 'Height',
    deviceZone: 'Time Zone',
    noPropertyMessage: 'No property found to pair a device. Go to',
    noPropertyMessageLink: 'Create Property',
    noPropertyRecommendedVideos: 'Currently no local videos found for this location. We are sending our videographers to various cities to record videos based on the demand and your ',
    propertyRecommendMoreText: 'We are constantly adding new content. Content that are relevant to your location will automatically added to your channel.',
    feedback: 'feedback',
    accurateAddressWarning: 'To show more accurate local recommendations to guests, Please go to the address screen and specify the complete street address.',
    noPropertyVideosError: 'Please select at least {minimumCriteria} videos for this property to publish.',
    add: 'add',
    noPropertyMessageEnd: 'and add device to it.',
    copyLinkTextProp: 'Please share the above link with your guests. Your recommendations and information about near by attractions will help them plan their stay.',

    'breadCrumbs.profile': 'Application / Profile',
    'breadCrumbs.dashboard': 'Application / Dashboard',
    'breadCrumbs.userlist': 'Application / Users',
    'breadCrumbs.userform': 'Application / Form',
    'breadCrumbs.metalist': 'Application / Meta Tags',
    'breadCrumbs.videoUpload': 'Application / Upload Video',
    'breadCrumbs.property': 'Application / Manage Property',
    'breadCrumbs.manageVideo': 'Application / Manage Videos',
    'breadCrumbs.devices': 'Application / Devices',
    'breadCrumbs.termsOfService': 'Application / Terms of Service',
    'breadCrumbs.privacyPolicy': 'Application / Privacy Policy',
    'breadCrumbs.pairDevice': 'Application / Pair Devices',
    'breadCrumbs.addPropertyInfo': '{propertyName} / {header}',
    videoSection: 'Videos',
    tagsSubMenu: 'Manage Tags',
    usersSubMenu: 'Manage Users',
    profileSection: 'Profile',
    profileSubMenu: 'Your Profile',
    propertySection: 'Properties',
    deviceSubMenu: 'Manage Devices',
    aboutSection: 'About Us',

    all: 'All',
    search: 'SEARCH',
    searchAutoComplete: 'Search',
    filters: 'Select Filter',

    serial: 'Sr No.',
    tagName: 'Tag Name',
    createdBy: 'Created By',
    createdAt: 'Created At',

    propertyName: 'Property Name',
    linkDate: 'Link Date',

    enterEmail: 'Enter Email',
    enterTag: 'Enter Tag Name',
    enterPropertyName: 'Enter Property Name',
    details: 'Details',
    changePassword: 'Change Password',
    resetPassword: 'Reset Password',
    avatar: 'Avatar',
    changeProfile: 'Change Photo',
    invalidProfilePic: 'Please select valid image file having size less than 40MB.',
    tagDialogBox: 'Do you want to change the status ?',
    hostMessage: 'I am a host and I will manage my properties.',
    goBack: 'Go Back',
    back: 'Back',
    publish: 'Publish',
    loginSource: 'Login Source',

    userRegsisterSuccess: 'We have sent a verification link to your email. Please check your inbox.',
    userVerifySuccess: 'We have successfully verified your email, please login using below button.',

    enableUserText: 'Are you sure you want to enable this user ?',
    disableUserText: 'Are you sure you want to disable this user ?',
    enablePropertyText: 'Are you sure you want to enable this property ?',
    disablePropertyText: 'Are you sure you want to disable this property ?',
    enableTagText: 'Are you sure you want to enable this tag ?',
    disableTagText: 'Are you sure you want to disable this tag ?',
    enablePropertyTip: 'Enable Property',
    disablePropertyTip: 'Disable Property',
    editPropertyTip: 'Edit Property',
    editPicture: 'Edit Picture',
    addPropertyInfoTip: 'Property Videos/Sides',
    addPropertySlide: 'Add Slide',
    addPropertyTip: 'Add New Property',
    getPublicLinkTip: 'Generate Public Link',
    urlDialogMessage: 'Public Video link for this property is : ',
    copyLinkText: 'Copy Link',
    slideTextHint: 'Tap to add Title here',
    slideDescHint: 'Tap to add text...',
    imageHintText: 'Recommended image size is 1920x1080 or having 16x9 aspect ratio.',
    slideExit: 'Exit',
    crop: 'Crop',
    slideFinish: 'Finish',
    slidePreview: 'Preview',
    emptySlideText: 'You haven\'t added any text to the screen. Please add text before pressing "Finish".',
    emptySlideHeaderText: 'Please Enter Slide Information',
    sortPropertyTip: 'Sort Property by:',
    cancel: 'Cancel',
    confirm: 'Confirm',
    clear: 'Clear',
    exitSnapShot: 'Exit Slide',
    exitHeaderText: 'Exit Slides',
    exitSlideText: 'Are you sure you want to exit the slide creation process? <br /> <br /> ' +
    'Exiting without saving would undo all your recent changes.',
    emptySlideListLength: 'As you haven\'t made any changes, this slide will not be saved.',
    dontExit: 'Don\'t Exit',
    hostHeadStart: 'Hey There! ',
    hostHeadText: 'This is your host {name}. ',
    hostSubText: 'Thanks for choosing to stay with us I have some recommended videos to make your stay & travelling experience great!',
    noContentAvailablePublic: 'None of the videos for this property were translated to {langToDisplay}. Please, select another language.',
    errorPublicMessage: 'Requested Page doesn\'t exist. Please try again.',
    contentSearch: 'Content Search',
    contentName: 'Content Name',
    previewButton: 'Play Video',
    categoryName: 'Category Name',
    displayOrder: 'Display Order',
    displayOrderError: 'Please enter display order',
    duplicateDisplayOrderError: 'This order has already been linked with video',
    categoryNameError: 'Please select a category',
    duplicateLinkVideoError: 'This Video has already been linked with this category.',
    contentNameError: 'Please enter content name',
    contentDecription: 'Description',
    contentDecriptionError: 'Please enter content description',
    deleteContentTip: 'Remove Content',
    apply: 'Apply',
    emptyErrorMessage: 'Please Enter the ',
    filterElasticError: '{name} can not be selected as {parentName} has yet not been applied',
    deleteFilterTip: 'Remove Filter',
    filterRemovedMessage: 'Removing {selectedFilterName} from the applied filters removes {parentName} from the selected / applied Filters',
    previous: 'Previous',
    next: 'Next',
    contentMeta: 'Content Meta-Information',
    default: 'Default',
    name: 'Name',
    nameError: 'Please enter the name of the video',
    language: 'Language',
    languageError: 'Please enter the language',
    keywordsError: 'Please enter less than 100 characters.',
    selectedLangError: 'Language is already selected',
    description: 'Description',
    descriptionError: 'Please enter the description',
    source: 'Source',
    neighborhood: 'Neighborhood',
    startDate: 'Start Date',
    expiryDate: 'Expiry Date',
    postalcode: 'Postal Code',
    latitude: 'Latitude',
    longitude: 'Longitude',
    country: 'Country',
    state: 'State',
    region: 'Region',
    city: 'City',
    cityHint: 'Type the city name',
    street: 'Street Address',
    streetSearch: 'Search Street Address',
    address: 'Address',
    addressError: 'Please enter the address',
    expiryDateErrorLabel: 'Expiry date should be greater than current/start date.',
    expiryDateFilterLabel: 'Expiry date should be greater than start date.',
    startDateErrorLabel: 'Start date should be less than expiry date.',
    clearDate: 'Clear Date',
    clearRegion: 'Clear Region',
    license: 'License',
    credits: 'Credits',
    rights: 'Rights',
    copyright: 'Copyright Notice',
    propertyError: 'Please enter property name',
    cityError: 'Please select a valid city',
    streetError: 'Please enter a valid street address',
    postalcodeError: 'Please enter the valid Postal Code',
    stateError: 'Please select a State',
    countryError: 'Please select a Country',
    addLocalised: 'Add localised details',
    contentDetails: 'Content Details',
    searchPlaces: 'Search Places',
    viewDetails: 'Details',

    contactNo: 'Contact No ',
    website: 'Website ',
    videoCredits: 'Video-Credits ',

    selectVideo: 'Select Video',
    videoLanguage: 'Video Language',
    videoContent: 'Video Content Type',
    browseVideo: 'Browse Video',
    addVideo: 'Add Video',
    editVideo: 'Edit Video',
    chooseLayout: 'Choose Layout',
    addSlide: 'Add Slide',
    editSlide: 'Edit Slide',
    createVideo: 'Create Video',
    canNotCreateVideo: 'Oops! You cannot create a video at this moment, since you have added information snapshot in' +
    ' this category. <br /><br /> To create a video, delete snapshot first.',
    createSlide: 'Create Slide',
    canNotCreateSlide: 'Oops! You cannot create a slide at this moment, since you have added video in' +
     ' this category. <br /><br /> To create a slide, delete video first.',
    gotItText: 'Got It',
    delSlide: 'Delete Slide',
    delVideo: 'Delete Video',
    doNotDeleteSlide: 'Are you sure you want to delete this snapshot ? <br /><br /> ' +
    'This action will remove all your existing data in this section.',
    doNotDeleteVideo: 'Are you sure you want to delete this video ? <br /><br /> ' +
    'This action will remove all your existing data in this section.',
    videoStaus: 'Processing',
    websiteNameError: 'Please enter a valid website name',
    videoUrlError: 'Please either upload a valid video file or enter valid source url.',
    invalidVideoUpload: 'Please select a valid video file having size less than 1GB.',
    invalidSmallVideoUpload: 'Please select a valid video file having duration less than 2 minutes and size less than 1GB.',
    addTags: 'Add Tags',
    addKeywords: 'Add Keywords',
    tagValue: 'Tag Value',
    or: 'OR',
    videoUrlText: 'Enter Video Source Url',
    videoUrlFoatingText: 'Video Url',
    videoScriptText: 'Enter Video Script',
    videoScriptFoatingText: 'Video Script',
    phoneText: 'Enter Phone Number',
    phoneFoatingText: 'Phone Number',
    websiteText: 'Enter Website',
    websiteFoatingText: 'Website',
    keywords: 'Keywords',
    metatags: 'Metatags',
    localizedInfo: 'Localized Information',
    removeTag: 'Delete Tag',
    languagueNotification: 'Assuming the language used in the video is {currentLanguage}. This information is used during closed captioning. Please, change if the video language is different.',

    uploadPercent: '% Completed',
    tagValueError: 'Please enter tag value',
    videoUplaoded: 'Video Uploaded',
    videoUpdateSuccess: 'We have successfully updated your data.',
    sourceUrlConfirmation: 'Your video upload is in progress and will be availble soon.',
    uploadConfirmation: 'Your video is uploaded successfully.',
    uploadReset: 'Upload More Videos',
    manageVideo: 'Manage Videos',
    videoTypeToolTip: 'Please upload one of the following formats: (webm, mkv, flv, mov, mp4, mpg, 3gp, avi, wmv).',

    videoSearchHint: 'Enter Video Name',
    videoDropDownText: 'Select Action',
    noVideoMessage: 'You have not uploaded any video so far, please',
    upload: 'upload',
    noSearchContent: 'No results found. Please modify your search.',
    videoModalTitle: 'Video Details',
    noVideoMessageEnd: 'video.',
    noVideoSupport: 'Your browser does not support HTML5 video.',
    no: 'No',
    yes: 'Yes',
    content: 'Content',
    available: 'Available',
    NoPreview: 'No Preview',
    keywordsToolTip: 'You can enter multiple keywords. After typing one keyword press Enter key to enter new one.',
    tagSearchToolTip: 'Type below in the search box to search any tag by name. Select tag from dropdown and press enter.',
    actions: 'Actions',
    resetButtonText: 'Reset',
    editVideoContent: 'Edit Video Content',
    thumbnailText: 'Thumbnail',
    thumbnailToolTip: 'Add Thumbnail',
    thumbnailSelect: 'Can select upto 10 images',
    thumbnailDeleteTooltip: 'Delete currrent Image',
    downloadTooltip: 'Download Video Content',
    downloadVideoTip: 'Download Video File',
    downloadThumbnailTip: 'Download Thumbnail',
    thumbnailUpdateSuccess: 'We have successfully updated your thumbnails.',
    thumbnailUploadInProgress: 'Thumbnails upload is in progress.',
    blocedVideoOpen: 'Thumbnails upload is in progress for this video. Please wait for a while.',
    transcodeDialog: 'This video is not transcoded yet, do you want to transcode this video and then Publish ?',
    thumbnailDefaultTooltip: 'Make Default',

    userVerifyFailure: 'Please register again, either email or token provided is invalid.',
    duplicateEmailError: 'This email has already been registerd with us, please register with a different email.',
    registerAccount: 'By signing up, you agree to our',
    terms: 'Terms',
    support: 'Support',
    readText: 'and that you have read our',
    privacyLinkText: 'Privacy',

    link: 'Pair Device',
    linkPairDevice: 'Learn More >',
    linkUploadVideo: 'Upload Video',
    pairRokuText: 'Pair your Roku TV Device',
    rokuPairedToNewProperty: 'Device paired successfully.',
    addPropertyVideos: 'Choose a category to add a video or information snapshot',
    addPropertyVideosText: 'You can add host videos later.',
    propertyPublished: 'Successfully Published',
    propertyLiveText: 'Congratulations! You have successfully published your property with us and is live now.',
    linkPairDeviceText: 'You can also pair device by launching ROKU TV App.',
    linkUploadVideoText: 'You can also add your custom property videos.',
    backButtonText: '< Back to Manage Properties',

    welcomeSystemsRights: '2017 Welcome Systems Inc. All Rights Reserved.',
    shareFeedback1: 'Help improve WelcomeTV with your ',
    shareFeedback2: 'feedback',
    welcomeTvHostContent1: 'Are you a host. ',
    welcomeTvHostContent2: 'Get WelcomeTV ',
    welcomeTvHostContent3: 'for your property!',
    tipsText: 'More Tips',
    sampleText: 'Sample',

    linkRokuHeadingA1: 'What is ',
    linkRokuHeadingA2: 'WelcomeTV?',
    linkRokuHeadingB1: 'What does ',
    linkRokuHeadingB2: '"Linking" a device do?',
    linkRokuHeadingC: 'How to create your own streaming video channel?',
    linkRokuTextA1: 'WelcomeTV is video streaming platform for vacation and short-term rentals, that allows hosts to ' +
    'create their own video channel to greet guests, showcase amenities and share a rich collection of videos of ' +
    'local attractions.',
    linkRokuTextA2: 'Best of all, guests can watch your property video channel on their mobile or on your' +
    ' property\'s smart TV better.',
    linkRokuTextB1: 'Download the WelcomeTV app from Apple Appstore',
    linkRokuTextB2: 'If you are an Android or web only user, you can use our web application to manage your property',
    iPhoneText: 'iPhone Users',
    androidText: 'Android Users',
    linkRokuTextC1: 'Once you create one or more property streaming channel, you can specify which smart TV device is' +
    ' associated a specific property.',
    linkRokuTextC2: 'This pairing enables the right videos to be associated with the right property.',
    getStarted: 'Get Started',
    linkRokuClick: 'Find Out More',
    welcomeAppInstruction1: 'Login to WelcomeTV',
    welcomeAppInstruction2: 'Create & Publish your property',
    welcomeAppInstruction3: 'Click on the "pair device" and enter the code displayed on the WelcomeTV app.',


    rokuDeviceListA: 'into WelcomeTV.',
    rokuDeviceListB: 'Created a property on WelcomeTV.',
    rokuDeviceListC: 'Click on the "pair device" and enter the code displayed on the WelcomeTV app on Roku.',

    'videoDetail.city': 'City',
    'videoDetail.country': 'Country',
    'videoDetail.state': 'State',
    'videoDetail.videoLanguage': 'Video Language',
    'videoDetail.contentType': 'Content Type',
    'videoDetail.credits': 'Credits',
    'videoDetail.duration': 'Duration',
    'videoDetail.latitude': 'Latitude',
    'videoDetail.longitude': 'Longitude',
    'videoDetail.license': 'License',
    'videoDetail.neighborhood': 'Neighborhood',
    'videoDetail.postalcode': 'Postal Code',
    'videoDetail.rights': 'Rights',
    'videoDetail.source': 'Source',
    'videoDetail.expiryDate': 'Expiry Date',
    'videoDetail.startDate': 'Start Date',
    'videoDetail.contentGroup': 'Content Group',
    'videoDetail.defaultLocallanguage': 'Default Local Language',
    'videoDetail.script': 'Script',
    'videoDetail.title': 'Title',
    'videoDetail.streamFormat': 'Stream Format',
    'videoDetail.address': 'Address',
    'videoDetail.copyright': 'Copyright',
    'hostVideoInstruction.1': 'Create a video to personally welcome your guests and help them get to know you better.',
    'hostVideoInstruction.2': 'Use video to highlight your property’s special features, explain your house rules, and provide necessary instructions, like how to get Wi-Fi.',
    'hostVideoInstruction.3': 'Help guests discover your neighborhood so they can truly "live like a local."',
    'hostVideoInstruction.4': 'Share your suggestions for the best places to see, eat, and explore.',

    //  ---------Privacy Policy------------------

    privacyPolicy: 'Privacy Policy',
    privacyPolicyA: 'This notice describes the Welcome Systems Privacy Policy, ' +
    'including what information we collect, how we use that information, and what ' +
    'choices you have regarding your personal information. Please take the time to read' +
    ' this policy carefully. By visiting this Site, downloading one of our apps, or otherwise' +
    ' using the Welcome System Services, you are accepting the practices described ' +
    'in this Privacy Policy. ',

    heading1: 'Information We Collect',

    infoContent: 'The information we learn from customers helps us personalize ' +
    'and continually improve your experience. Here are the types of information we collect.',

    infoLiAheading: 'Information You Give Us: ',
    infoLiAcontent: 'We receive and store any information you enter while using our Services, either through our Website (Welcome.Systems) or mobile applications, or give us in any other way. For example, we collect this information when you create an account, begin a subscription, contact our customer support, register for our message boards, sign up for our email newsletters, or participate in surveys, questionnaires, promotions and give-aways. Examples of the types of personally identifying information that we collect for these purposes may include your name, mailing address, telephone number, email address or other information that could be used to identify or contact you. If you are the host of a property, we also collect the address of that property from you. ',
    infoLiBheading: 'Automatic Information: ',
    infoLiBcontent: 'We receive and store certain types of information whenever you interact with us. For example, like many websites, we use "cookies," and we obtain certain types of information when your Web browser accesses this Website or advertisements and other content served by or on behalf of Welcome Systems on other websites. Examples of the information we collect and analyze include the Internet protocol (IP) address used to connect your computer to the Internet; computer and connection information such as browser type, version, and time zone setting, browser plug-in types and versions, operating system, and platform; as well as traffic and usage on our Site. We are also able to view the browsing and viewing preferences for each unique welcome channel, as well as which property that content is being viewed from. We may also collect technical information to help us identify your device for fraud prevention and diagnostic purposes. ',
    infoLiCheading: 'Mobile: ',
    infoLiCcontent: 'When you download or use apps created by or on behalf of Welcome Systems, we may receive information about your location and your mobile device, including a unique identifier for your device. We may use this information to provide you with location-based services, such as advertising, search results, and other personalized content. Most mobile devices allow you to turn off location services. If you have questions about how to do this, we recommend that you contact your device manufacturer.',
    infoLiDheading: 'E-mail Communications:',
    infoLiDcontent: 'To help us make e-mails more useful and interesting, we often receive a confirmation when you open e-mail from Welcome Systems if your computer supports such capabilities. If you do not want to receive e-mail or other mail from us, please use the unsubscribe method that will be provided in each email we send you. ',
    infoLiEheading: 'Information from Other Sources: ',
    infoLiEcontent: ' We might receive information about you from other sources and add it to our account information.',

    heading2: 'Cookies/ “Do Not Track” ',

    cookiesLi1: 'Cookies are unique identifiers that we transfer to your device to enable our systems to recognize your device and to provide features that enhance your experience, such as retaining your personal settings or keeping you logged in to your account.',
    cookiesLi2: 'The Help feature on most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether. Because cookies allow you to take advantage of some of essential features of our Services, we recommend that you leave them turned on.',

    heading3: 'How We Share the Information We Receive',
    heading3Content: 'Information about our customers is an important part of our business, and we are not in the business of selling it to others. We share customer information only as described below',
    heading3Li1Heading: 'Third-Party Service Providers: ',
    heading3Li1Content: 'We employ other companies and individuals to perform functions on our behalf. Examples include analyzing data, providing marketing assistance, providing search results and links, processing credit card payments, and providing customer service. They have access to personal information needed to perform their functions, but may not use it for other purposes.',

    heading3Li2Heading: 'Promotional Offers:',
    heading3Li2Content: 'Sometimes we send offers to selected groups of Welcome Systems members on behalf of other businesses. When we do this, we do not give that business your name and address. If you do not want to receive such offers, please send an email to ',

    heading3Li3Heading: 'Protection of Welcome Systems and Others: ',
    heading3Li3Content: 'We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Terms of Use and other agreements; or protect the rights, property, or safety of Welcome Systems, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction. Obviously, however, this does not include selling, renting, sharing, or otherwise disclosing personally identifiable information from customers for commercial purposes in violation of the commitments set forth in this Privacy Policy.',

    heading3Li4Heading: 'With Your Consent: ',
    heading3Li4Content: 'Other than as set out above, you will receive notice when information about you might go to third parties, and you will have an opportunity to choose not to share the information.',

    heading4: 'Security',
    heading4Content: 'Your security and privacy are important to us, and we take the following precautions to safeguard your information. We keep the Personally Identifiable Information you provide on servers that are protected by firewalls and other technological means against intrusion or unauthorized access. They are located in a physically secure facility, and only our employees and agents with a need to know the information are given access. However, there is no such thing as “perfect security” on the Internet. We rely on you to select passwords that cannot be guessed easily and to safeguard those passwords from disclosure. Third parties may unlawfully access transmissions or private communications. Please contact us if you have any information regarding unauthorized use of the Sites.',

    heading5: 'Third-Party Advertisers and Links to Other Websites',
    heading5Content: 'Our Site includes third-party advertising and links to other websites. Our Privacy Policy does not apply to the websites that belong to other individuals and entities that you may visit from links through our Site. You should carefully review the privacy policies of any websites that you visit from ours to learn more about their information and privacy practices. The collection and use of your personal information shall be governed by such other party or site’s privacy policy. Welcome Systems Inc. is not responsible for their privacy practices.',

    heading6: 'HOW TO ACCESS, CHANGE OR DELETE YOUR INFORMATION, OR CANCEL YOUR ACCOUNT',
    heading6Content: 'We provide you with the ability to edit the information in your user account information that you provided to us in registration by using your personal page configuration area. You may request deletion of your user account by emailing us at ',
    heading6ContentContinued: ' Content or other Personal Information that you may have provided to us and that is not contained within your user account, such as videos uploaded by you, may continue to remain on our Service at our discretion even though your user account is deleted.',

    heading7: 'What Choices You Have',
    heading7Li1Content: 'If you do not want to receive e-mail from us, please follow instructions for unsubscribing from our mailing list, included at the end of each email.',
    heading7Li2Content: 'The Help feature on most browsers will tell you how to prevent your browser from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether.',
    heading7Li3Content: 'If you do not wish to receive promotional offers from our partners, and do not wish to participate in any other internet-based ad programs, please opt out by sending us an email to ',
    heading7Li3ContentContinued: ' We will keep track of your decision in our database. Even if you choose not to receive information from us, we reserve the right to communicate with you on matters we consider especially important relating to our products or services or relating to your account.',

    heading8: 'Children',
    heading8Content: 'Only persons age 18 and older who may legally enter into contracts may use our Site. We do not knowingly collect information from anyone under the age of 13, and will take steps to delete such information if we learn that this rule has been breached.',

    heading9: 'Facebook Ads',
    heading9Content: 'The Facebook Website Custom Audience is a specific Interest-Based Ads program that matches people that have shown interest in Welcome Systems through our website with their Facebook user profile so that we may deliver relevant, interest-based ads on Facebook.com. To find out more about Facebook ads programs, please click here. You can opt-out of this program and all Interest-based advertising by sending an email to Welcome Systems at ',

    heading10: 'Questions Concerning Our Privacy Policy',
    heading10Content: 'If you have any questions about this Policy or our web site, please feel free to contact our webmaster at ',
    heading10ContentContinued: ' We will provide an Unsubscribe method in any email we send to you.',

  //  ---------Terms of service----------------

    tos: 'Terms of Service',
    overviewHeading: 'Overview',

    overview: 'Hello and welcome to Welcome Systems! This Terms of Use Agreement (“Agreement”) ' +
    'constitutes a legally binding contract between Welcome Systems, Inc. (“Welcome ' +
    'Systems”, “we”, or “us), a California corporation, on the one hand, and you, on the other ' +
    'hand, with respect to your use of the Welcome.Systems Website, the Welcome ' +
    'Systems Service, Welcome Systems Apps, and any videos, software, data feeds, ' +
    '  information, text, graphics, files or other materials or services (the “Content”) displayed ' +
    'or accessible through the Welcome Systems Website and the Welcome Systems ' +
    'Service and Apps (collectively referred to herein as the “Services”). Your access to and ' +
    'use of the Services are expressly conditioned on your compliance with these Terms of ' +
    'Use. Please read the Agreement carefully and be advised that this Agreement contains ' +
    'disclaimers of warranties and limitations on liability that may be applicable to you.',

    point1Heading: '1. Acceptance of Terms of Use ',
    point1: 'By using or visiting the Welcome Systems Services you signify your agreement ' +
    'to (1) these terms and conditions (the "Terms of Use"), and (2) Our Privacy ' +
    'Policy, found at ',
    point1continued: ' and incorporated herein by reference. If you do not agree ' +
    'to any of these Terms or the Privacy Policy, please do not use the Service. The ' +
    'Welcome Systems service is provided by Welcome Systems, Inc., a California ' +
    'corporation, or one of our affiliated companies. Check back as the service ' +
    'provider may change from time to time. ' +
    'Welcome Systems may, from time to time, change these Terms of Use, including ' +
    'the Privacy Policy. Although we may attempt to notify you when major changes ' +
    'are made to these Terms of Use, you should periodically review the most up-todate ' +
    'version. Welcome Systems may, in its sole discretion, modify or revise these ' +
    'Terms of Use and policies at any time, and you agree to be bound by such ' +
    'modifications or revisions.  ',

    point2Heading: '2. Privacy. ',
    point2: ' Personally identifying information is subject to our Privacy Policy, the ' +
    'terms of which are incorporated herein. Please review our Privacy Policy to ' +
    'understand our practices. ',

    point3Heading: '3. Communication Preferences.',
    point3: ' If you register with us, you consent to ' +
    'receiving service messages relating to your account, such as payment ' +
    'confirmations, account verifications and transactional notices. You also consent  ' +
    'to receiving other communications from us such as newsletters, special offers, ' +
    'announcements and surveys, which you may opt out of by clicking on the ' +
    '"unsubscribe" links contained therein.',

    point4Heading: '4. Welcome Systems Accounts. ',
    point4: ' Some Services may require you to create an ' +
    'account with Welcome Systems. We reserve the right to decline to provide ' +
    'access to any of the Services to any person for any or no reason. If you choose ' +
    'to register, you must submit a valid e-mail address, select a username and ' +
    'password during the registration process, and be at least 18 years of age. If you ' +
    'are the host of a property, you must also submit location information about the ' +
    'property, and information about the hardware device you are using to access ' +
    'your Channel (i.e. smart tv or set-top box). You are responsible for safeguarding ' +
    'the password that you use to access any secure areas of the Services. You ' +
    'understand that any information you provide will be treated by Welcome Systems  ' +
    'in the manner described in this Agreement and our Privacy Policy. You agree not ' +
    'to disclose your password to any third party. You agree to take sole responsibility ' +
    'for any activities or actions under your password, whether or not you have ' +
    'authorized such activities or actions. You will immediately notify Welcome ' +
    'Systems of any unauthorized use of your password. Welcome Systems reserves ' +
    'the right to refuse providing access to the Services to any user, or to delete ' +
    'accounts created by users who appropriate the name, likeness, email address or ' +
    'other personally identifiable information of another individual. ',

    point5Heading: '5. Your Use of the Services. ',
    point5: 'You must be 18 years of age, or the age of majority in your province, territory or ' +
    'country, to become a member of the Welcome Systems service. Individuals ' +
    'under the age of 18, or applicable age of majority, may utilize the service only ' +
    'with the involvement of a parent or legal guardian, under such person\'s account ' +
    'and otherwise subject to these Terms of Use. You may only use the Services for ' +
    'lawful purposes, and subject to the restrictions set forth in these Terms of Use. ' +
    'You may not use our products for any illegal or unauthorized purpose nor may ' +
    'you, in the use of the Service, violate any laws in your jurisdiction (including but ' +
    'not limited to copyright laws). You must not transmit any worms or viruses or any ' +
    'code of a destructive nature. A breach or violation of any of the Terms will result  ' +
    'in an immediate termination of your Services. ' +
    'Furthermore, the Services may contain links to or Content from other websites or ' +
    'sources that are completely independent of Welcome Systems and may require  ' +
    'you to accept additional terms of service which will be presented to you before ' +
    'you can use such Services. Such Content may be protected by copyright or other ' +
    'intellectual property laws and treaties, and may be subject to terms of use of the ' +
    'third party providing such Content. By using the Service, you expressly relieve ' +
    'Welcome Systems from any and all liability arising from your use of any thirdparty ' +
    'website',

    point6Heading: '6. Your Use of Content ',
    point6: 'In addition to the general restrictions above, the following restrictions and ' +
    'conditions apply specifically to your use of Content.',

    point6A: 'A. The Content on the Service, and the trademarks, service marks and logos ' +
    '("Marks") on the Service, are owned by or licensed to Welcome Systems, subject ' +
    'to copyright and other intellectual property rights under the law.',

    point6B: 'B. Content is provided to you AS IS. You may access Content for your information ' +
    'and personal use solely as intended through the provided functionality of the ' +
    'Service and as permitted under these Terms of Use. You shall not download any ' +
    'Content unless you see a “download” or similar link displayed by Welcome ' +
    'Systems on the Service for that Content. You shall not copy, reproduce, ' +
    'distribute, transmit, broadcast, display, sell, license, or otherwise exploit any ' +
    'Content for any other purposes without the prior written consent of Welcome ' +
    'Systems or the respective licensors of the Content. Welcome Systems and its ' +
    'licensors reserve all rights not expressly granted in and to the Service and the ' +
    'Content.',

    point6C: 'C. You agree not to circumvent, disable or otherwise interfere with security-related ' +
    'features of the Service or features that prevent or restrict use or copying of any ' +
    'Content or enforce limitations on use of the Service or the Content therein. ',

    point7Heading: '7. Content You Post ',

    point7Aa: 'A. As a Welcome Systems account holder you may submit Content to the Service, ' +
    'including videos and user comments. You understand that Welcome Systems ' +
    'does not guarantee any confidentiality with respect to any Content you submit. ' +
    'Content you post via the Service may appear on other user\'s devices. You are ' +
    'responsible for all content that you post through or download from the Site. You ' +
    'may not post content that:',

    point7Ali1: 'Is not your own original creation or that you do not have permission to use ',

    point7Ali2: 'Infringes the copyright, trademark, patent right, or other proprietary right of any ' +
    'person or that is used without the permission of the owner;',

    point7Ali3: 'You know to be inaccurate;',

    point7Ali4: 'Is pornographic, sexually explicit, or obscene;',

    point7Ali5: 'Exploits children or minors;',

    point7Ali6: 'Violates the rights of privacy or publicity of any person;',

    point7Ali7: 'Is harassing, libelous, slanderous, or defamatory;',

    point7Ali8: 'Contains any personally identifying information about any person without their ' +
    'consent or about any person who is a minor;',

    point7Ali9: 'May be deemed generally offensive to the community, including blatant expressions ' +
    'of bigotry, prejudice, racism, hatred, profanity or religious or political radicalism;',

    point7Ali10: 'Includes advertisements, promotions, solicitations, spam, or offers to sell any goods ' +
    'or services for any commercial purpose;',

    point7Ali11: 'Is off topic;',

    point7Ali12: 'Is intended to provide professional advice, including but not limited to, the provision ' +
    'of medical treatment, or legal, financial or investment advice;',

    point7Ali13: 'Is intended to solicit, recommend, endorse, or offer to buy or sell any securities or ' +
    'other financial instruments, tout stocks, or recommend that any particular security, ' +
    'portfolio of securities, transaction, or investment strategy is suitable for you or any ' +
    'specific person;',

    point7Ali14: 'Violates any local, state, federal, and/or international laws or regulations;',

    point7Ali15: 'Promotes or provides instructional information about illegal or illicit activities;',

    point7Ali16: 'Contains software viruses or any other computer code, files, or programs designed ' +
    'to destroy, interrupt, or otherwise limit the functionality of any computer software, ' +
    'computer hardware, or other equipment; or,',

    point7Ali17: 'Is intended to overwhelm, cause technical disruptions of or denial of service to ' +
    'Company\'s servers',

    point7B: ' B. We may remove any content that violates these Terms or that we determine is ' +
    'otherwise not appropriate in our sole discretion. Welcome Systems may or may ' +
    'not exercise editorial control over content posted on the Service.',

    point7C: ' C. By posting or transmitting content on or through the Service, you: ',

    point7Cli1: 'Represent and warrant that you are the creator and owner of, or have the ' +
    'necessary licenses, rights, consents, and permissions to use and to authorize ' +
    'Welcome Systems and other users to use and distribute your content ' +
    ' as necessary to exercise the licenses granted by you in these Terms and in the ' +
    'manner contemplated by Welcome Systems and these Terms;',

    point7Cli2: 'You certify that you are at least 18 years old;',

    point7Cli3: 'Agree to and do hereby grant Welcome Systems and its affiliates and partners a ' +
    'nonexclusive, perpetual, irrevocable, worldwide, sublicensable, transferrable, ' +
    'royalty-free right and license to use, store, display, publish, transmit, transfer, ' +
    'distribute, reproduce, rearrange, edit, modify, aggregate, create derivative works ' +
    'of and publicly perform the content that you submit via the Service for any ' +
    'purpose, in any form, medium, or technology now known or later developed. You ' +
    'also acknowledge that (i) Welcome Systems may have already created, or be in ' +
    'the process of creating, content that may be substantially similar to your ideas at ' +
    'the time you submit those ideas to us, and (ii) elements of your ideas may not be ' +
    'subject to protection under copyright laws. You also grant Welcome Systems a ' +
    'license to use your user name in connection with our use of any content you ' +
    'provide to us. You also consent to the display of advertising within or adjacent to ' +
    'any of your content. Any comments or materials you send to Welcome Systems, ' +
    'including feedback data, such as questions, comments, suggestions and any ' +
    'other response shall be deemed to be non-confidential.',

    point8Heading: '8. Membership, Free Trials, Billing and Cancellation',

    point8A: 'A. Membership. Ongoing Membership. Some Services may require you to purchase ' +
    'a membership. Your Welcome Systems membership, which may start with a free ' +
    'trial, will continue month to-month unless and until you cancel your membership ' +
    'or we terminate it. You must have Internet access and provide us with a current, ' +
    'valid, accepted method of payment (as such may be updated from time to time, ' +
    '“Payment Method”) to use the Welcome Systems service. We will bill the monthly ' +
    'membership fee to your Payment Method. You must cancel your membership ' +
    'before it renews each month in order to avoid billing of the next month’s ' +
    'membership fees to your Payment Method. ' +
    'Differing Memberships. We may offer a number of membership plans, including ' +
    'special promotional plans or memberships with differing conditions and ' +
    'limitations. Any materially different terms from those described in these Terms of ' +
    'Use will be disclosed at your sign-up or in other communications made available ' +
    'to you. You can find specific details regarding your membership with Welcome ' +
    'Systems by logging into your account on our login page ',
    point8AContinued: '. Some promotional memberships are offered by third parties in conjunction with the ' +
    'provision of their own products and services. We are not responsible for the  ' +
    'products and services provided by such third parties. We reserve the right to ' +
    'modify, terminate or otherwise amend our offered membership plans.',

    point8B: 'B. Free Trials. ' +
    'Your Welcome Systems membership may start with a free trial. The free trial ' +
    'period of your membership lasts for Thirty (30) days, or as otherwise specified ' +
    'during sign-up. For combinations with other offers, restrictions may apply. Free ' +
    'trials are for new and certain former members only. Welcome Systems reserves ' +
    'the right, in its absolute discretion, to determine your free trial eligibility. ' +
    'We will begin billing your Payment Method for monthly membership fees at the ' +
    'end of the free trial period of your membership unless you cancel prior to the end ' +
    'of the free trial period. To view the specific details of your membership, including ' +
    'monthly membership price and end date of your free trial period, visit our login ' +
    'page and login to your account. We may authorize your Payment Method ' +
    'through various methods, including authorizing it up to approximately one month ' +
    'of service as soon as you register. In some instances, your available balance or ' +
    'credit limit may be reduced to reflect the authorization during your free trial ' +
    'period. ' +
    'You will not receive a notice from us that your free trial period has ended or that  ' +
    'the paying portion of your membership has begun. LOGIN TO YOUR ACCOUNT ' +
    'ON THE WELCOME SYSTEMS LOGIN PAGE ',
    point8BContinued: ' TO FIND CANCELLATION INSTRUCTIONS. We will continue to bill your Payment Method on a monthly ' +
    'basis for your membership fee until you cancel. ',

    point8Ca: 'C. Billing ' +
    'Recurring Billing. By starting your Welcome Systems membership and providing ' +
    'or designating a Payment Method, you authorize us to charge you a monthly ' +
    'membership fee at the then current rate, and any other charges you may incur in ' +
    'connection with your use of the Welcome Systems service to your Payment ' +
    'Method. You acknowledge that the amount billed each month may vary from ' +
    'month to month for reasons that may include differing amounts due to ' +
    'promotional offers, including gift card redemption and promotional code ' +
    'redemption, and/or changing or adding a plan, and you authorize us to charge ' +
    'your Payment Method for such varying amounts, which may be billed monthly in ' +
    'one or more charges.',

    point8Cb: 'Price Changes. We reserve the right to adjust pricing for our service or any ' +
    'components thereof in any manner and at any time as we may determine in our ' +
    'sole and absolute discretion. Except as otherwise expressly provided for in these ' +
    'Terms of Use, any price changes to your service will take effect following email ' +
    'notice to you.',

    point8Cc: 'Billing Cycle. The membership fee for our service will be billed at the beginning of ' +
    'the paying portion of your membership and each month thereafter unless and ' +
    'until you cancel your membership. We automatically bill your Payment Method ' +
    'each month on the calendar day corresponding to the commencement of your ' +
    'paying membership. Membership fees are fully earned upon payment. We ' +
    'reserve the right to change the timing of our billing, in particular, as indicated ' +
    'below, if your Payment Method has not successfully settled. In the event your ' +
    'paying membership began on a day not contained in a given month, we may bill ' +
    'your Payment Method on a day in the applicable month or such other day as we ' +
    'deem appropriate. For example, if you started your Welcome Systems ' +
    'membership or became a paying member on January 31st, your next payment ' +
    'ate is likely to be February 28th, and your Payment Method would be billed on ' +
    'that date. Your renewal date may change due to changes in your Membership. Visit our login page ',
    point8CcContinued: ' and login to your account to see the commencement ' +
    'date for your next renewal period. We may authorize your Payment Method in ' +
    'anticipation of membership or service-related charges. As used in these Terms of ' +
    'Use, “billing” shall indicate a charge, debit or other payment clearance, as ' +
    'applicable, against your Payment Method. Unless otherwise stated differently, ' +
    'month or monthly refers to your billing cycle.',

    point8Cd: 'No Refunds. PAYMENTS ARE NONREFUNDABLE AND THERE ARE NO ' +
    'REFUNDS OR CREDITS FOR PARTIALLY USED PERIODS. Following any ' +
    'cancellation, however, you will continue to have access to the service through the ' +
    'end of your current billing period. At any time, and for any reason, we may ' +
    'provide a refund, discount, or other consideration to some or all of our members ' +
    '(“credits”). The amount and form of such credits, and the decision to provide ' +
    'them, are at our sole and absolute discretion. The provision of credits in one ' +
    'instance does not entitle you to credits in the future for similar instances, nor ' +
    'does it obligate us to provide credits in the future, under any circumstance.',

    point8Ce: 'Payment Methods. You may edit your Payment Method information by logging in ' +
    'to your account on the login page ',
    point8CeContnued: ', and clicking on the “Upgrade Plan” link. ' +
    'If a payment is not successfully settled, due to expiration, insufficient funds, or ' +
    'otherwise, and you do not edit your Payment Method information or cancel your ' +
    'account (see, “Cancellation” below), you remain responsible for any uncollected ' +
    'amounts and authorize us to continue billing the Payment Method, as it may be ' +
    'updated. This may result in a change to your payment billing dates. For certain ' +
    'Payment Methods, the issuer of your Payment Method may charge you a foreign ' +
    'transaction fee or other charges. Check with your Payment Method service ' +
    'provider for details.',

    point8Cf: 'Cancellation. You may cancel your Welcome Systems membership at anytime ' +
    'however as soon as you unsubscribe, your services will be terminated. WE DO ' +
    'NOT PROVIDE REFUNDS OR CREDITS FOR ANY PARTIAL MONTH ' +
    'MEMBERSHIP PERIODS OR UNWATCHED MOVIES OR TV SHOWS. To cancel, login to your account on our login page ',
    point8CfContnued: 'and click on the “Cancel Plan” link.',

    point9Heading: '9. Disclaimers of Warranties and Limitations on Liability ',

    point9A: 'A. THE WELCOME SYSTEMS SERVICE AND ALL CONTENT AND ' +
    'SOFTWARE ASSOCIATED THEREWITH, OR ANY OTHER FEATURES ' +
    'OR FUNCTIONALITIES ASSOCIATED WITH THE WELCOME SYSTEMS ' +
    'SERVICE, ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITH ALL ' +
    'FAULTS AND WITHOUT WARRANTY OF ANY KIND. WELCOME ' +
    'SYSTEMS DOES NOT GUARANTEE, REPRESENT, OR WARRANT ' +
    'THAT YOUR USE OF THE WELCOME SYSTEMS SERVICE WILL BE ' +
    'UNINTERRUPTED OR ERROR-FREE. WELCOME SYSTEMS ' +
    'SPECIFICALLY DISCLAIMS LIABILITY FOR THE USE OF ANY ' +
    'SOFTWARE APPLICATIONS AND INTERNET-CONNECTED ' +
    'HARDWARE DEVICES (INCLUDING THEIR CONTINUING ' +
    'COMPATIBILITY WITH OUR SERVICE). ',

    point9B: 'B. TO THE EXTENT PERMISSIBLE UNDER APPLICABLE LAWS, IN NO ' +
    'EVENT SHALL WELCOME SYSTEMS, ITS OFFICERS, DIRECTORS, ' +
    'EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY DIRECT, ' +
    'INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL ' +
    'DAMAGES WHATSOEVER RESULTING FROM ANY (I) ERRORS, ' +
    'MISTAKES, OR INACCURACIES OF CONTENT, (II) PERSONAL INJURY ' +
    'OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, ' +
    'RESULTING FROM YOUR ACCESS TO AND USE OF OUR SERVICES, ' +
    '(III) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE ' +
    'SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR ' +
    'FINANCIAL INFORMATION STORED THEREIN, (IV) ANY ' +
    'INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM ' +
    'OUR SERVICES, (IV) ANY BUGS, VIRUSES, TROJAN HORSES, OR ' +
    'THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH OUR ' +
    'SERVICES BY ANY THIRD PARTY, AND/OR (V) ANY ERRORS OR ' +
    'OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ' +
    'ANY KIND INCURRED AS A RESULT OF YOUR USE OF ANY CONTENT ' +
    'POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE ' +
    'AVAILABLE VIA THE SERVICES, WHETHER BASED ON WARRANTY, ' +
    'CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER ' +
    'OR NOT THE COMPANY IS ADVISED OF THE POSSIBILITY OF SUCH ' +
    'DAMAGES. THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY ' +
    'TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE ' +
    'JURISDICTION.',

    point9C: 'C. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF ' +
    'CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF ' +
    'LIABILITY FOR CERTAIN TYPES OF DAMAGES. THEREFORE, SOME ' +
    'OF THE ABOVE LIMITATIONS IN THIS SECTION MAY NOT APPLY TO ' +
    'YOU. if you are a California resident, you waive California civil code ' +
    '§1542, which says: a general release does not extend to claims which the ' +
    'creditor does not know or suspect to exist in his or her favor at the time of ' +
    'executing the release, which if known by him or her must have materially ' +
    'affected his or her settlement with the debtor. ',

    point9D: 'D. NOTHING IN THESE TERMS OF USE SHALL AFFECT ANY NONWAIVABLE ' +
    'STATUTORY RIGHTS THAT APPLY TO YOU. If any provision ' +
    'or provisions of these Terms of Use shall be held to be invalid, illegal, or ' +
    'unenforceable, the validity, legality and enforceability of the remaining ' +
    'provisions shall remain in full force and effect',

    point10Heading: '10. Roku Program. ',

    point10: ' For certain qualifying hosts, Welcome Systems may, from time ' +
    'to time, provide demo Roku devices in accordance with the Rules and ' +
    'Restrictions of the Roku Program (Link). Without limitation to the foregoing ' +
    'Section 9 of this Agreement, Welcome Systems specifically disclaims all ' +
    'warranties for the use of these demo boxes, including their continued ' +
    'functionality. All Roku devices will be provided to hosts as is, and it will be the ' +
    'responsibility of the host to contact the device manufacturer in case of any  ' +
    'defects. In no case shall Welcome Systems be liable to any users for damages of ' +
    'any nature incurred from the use or possession of a Roku device. [Need to ' +
    'decide whether these become property of the host or remain property of WS]. ',

    point11Heading: '11. Indemnity.',
    point11: 'To the extent permitted by applicable law, you agree to defend, ' +
    'indemnify and hold harmless Welcome Systems, its officers, directors, ' +
    'employees and agents, from and against any and all claims, damages, ' +
    'obligations, losses, liabilities, costs or debt, and expenses (including but not ' +
    'limited to attorney\'s fees) arising from: (i) your use of and access to the ' +
    'Service; (ii) your violation of any term of these Terms of Use; or (iii) your ' +
    'violation of any third party right, including without limitation any copyright, ' +
    'property, or privacy right. This defense and indemnification obligation will survive ' +
    'these Terms of Use and your use of the Service.',

    point12Heading: '12. Claims of Copyright Infringement. ',

    point12: 'If you believe your work has been reproduced or distributed in a way that ' +
    'constitutes a copyright infringement or are aware of any infringing material ' +
    'available through the Welcome Systems service, you can report such violation to ' +
    'us in accordance with the Digital Millennium Copyright Act (17 U.S.C. §512). In ' +
    'the case of an alleged infringement, please provide the following information: ',

    point12li1: 'A description of the copyrighted work or other intellectual property that you claim ' +
    'has been infringed;',

    point12li2: 'A description of where the material that you claim is infringing is located on the ' +
    'Site (including the exact URL);',

    point12li3: 'An address, a telephone number, and an e-mail address where we can contact ' +
    'you;',

    point12li4: 'A statement that you have a good faith belief that the use is not authorized by the ' +
    'copyright or other intellectual property rights owner, by its agent, or by law;',

    point12li5: 'A statement by you under penalty of perjury that the information in your notice is ' +
    'accurate and that you are the copyright or intellectual property owner or are ' +
    'authorized to act on the owner\'s behalf; and ',

    point12li6: 'Your electronic or physical signature, or that of the person authorized to act on ' +
    'behalf of the owner of the copyright or other right being infringed. ' +
    'We may request additional information before we remove allegedly infringing ' +
    'material. You may report a copyright violation by providing the above information  ' +
    'to legal@welcometv.net. ',

    point13Heading: '13. Governing Law.',

    point13: 'Terms of Use shall be governed by and construed in ' +
    'accordance with the laws of the state of California, U.S.A. without regard to ' +
    'conflict of laws provisions. These terms will not limit any consumer protection ' +
    'rights that you may be entitled to under the mandatory laws of your state of ' +
    'residence.',

    point14Heading: '14. Applications. ',

    point14: ' You may encounter third-party applications (including, without ' +
    'limitation, websites, widgets, software, or other software utilities) ' +
    '("Application(s)") that interact with the Welcome Systems service. These ' +
    'Applications may import data related to your Welcome Systems account and ' +
    'activity and otherwise gather data from you. These Applications are provided ' +
    'solely as a convenience to you, and Welcome Systems is not responsible for ' +
    'such Applications. SUCH APPLICATIONS ARE OWNED OR OPERATED BY ' +
    'THIRD PARTIES THAT ARE NOT RELATED TO WITH OR SPONSORED BY ' +
    'WELCOME SYSTEMS AND MAY NOT BE AUTHORIZED FOR USE WITH OUR ' +
    'SERVICE IN ALL COUNTRIES. USE OF AN APPLICATION IS AT YOUR OWN ' +
    'OPTION AND RISK',

    point15Heading: ' 15. Customer Support. ',

    point15: ' To find more information about our service and its features, ' +
    'or if you need assistance with your account, please contact us at ',
    point15Continued: ' In certain instances, Customer Service may best be able to assist you by using a remote ' +
    'access support tool through which we have full access to your computer. If you ' +
    'do not want us to have this access, you should not consent to support through ' +
    'the remote access tool, and we will assist you through other means. In the event ' +
    'of any conflict between these Terms of Use and information provided by ' +
    'Customer Support or other portions of our website, these Terms of Use will ' +
    'control. ',

    point16Heading: ' 16. Survival. ',

    point16: ' If any provision or provisions of these Terms of Use shall be held to be ' +
    'invalid, illegal, or unenforceable, the validity, legality and enforceability of the ' +
    'remaining provisions shall remain in full force and effect. ',
};
export default messages;
