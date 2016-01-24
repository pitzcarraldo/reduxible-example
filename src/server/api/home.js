import Express from 'express';

const router = Express.Router(); //eslint-disable-line

router.get('/', (req, res) => {
  res.send([{
    title: 'Why Reduxible?',
    description: `React, Redux and other related things are already good enough to use directly. But some people (like me) only want to focus to application codes and don't want to spend time for make and sustain project base. So I wrapped base elements for React + Redux Application. If you use Reduxible, you only have to make and set Router, Middleware, Reducers and React Components to Reduxible. When then, you can run React + Redux App immediately. Also, it can be Universal App or Single Page App by config.`
  },{
    title: 'We Need Long-Term Services!',
    description: `The environment of React and Redux is changing very quickly every day. There are too many related libraries and APIs of those are changing frequently. But for making real products, we need stable and verified stuff. Reduxible provides required modules that have many references for make universal application with React and Redux. And they are peer dependencies, so you can update them for the minor update. Reduxible will provides fixed API by wrapping that modules and will not update except when those have critical bugs. Therefore, you can only focus to make functions your application without modifying integration codes on your application. Reduxible will provide Long-Term Services for React + Redux application that even can be run in the Internet Explorer 8!`
  }]);
});

export default router;
