import Express from 'express';

const router = Express.Router();

router.get('/', function (req, res) {
  res.send({
    title: 'Why Reduxible?',
    description: `React, Redux and other related things are already good enough to use directly. But some people (like me) only want to focus to application codes and don't want to spend time for make and sustain project base. So I wrapped base elements for React + Redux Application. If you use Reduxible, you only have to make and set Router, Middleware, Reducers and React Components to Reduxible. When then, you can run React + Redux App immediately. Also, it can be Universal App or Single Page App by config.`
  });
});

export default router;
