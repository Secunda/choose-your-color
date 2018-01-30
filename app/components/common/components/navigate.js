import {NavigationActions} from 'react-navigation';

const navigate = (props, routeName) => {
  props.navigation.navigate(routeName);
};

const navigateWithIndex = async (props, routeName, index = 0) => {
  await props.navigation.dispatch(NavigationActions.reset({
    index,
    actions: [
      NavigationActions.navigate({routeName}),
    ],
  }));
};

const navigateWithoutHistory = async (props, routeName) => {
  await navigateWithIndex(props, routeName, 0);
};


export {
  navigateWithoutHistory,
  navigateWithIndex,
  navigate,
};
