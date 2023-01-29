export const getParams=(platform='Pwa',pId='13',mediaType) => {
  let defaultParams= {
      platform,
      pId,
    };

  if(mediaType)
    defaultParams.mediaType=mediaType;

    return {
      defaultParams,
    };
};

export const getAuthParams=(platform='Web',pId='2') => {
  let defaultParams= {
    platform,
    pId,
  };
  return {
    defaultParams,
  };
};
