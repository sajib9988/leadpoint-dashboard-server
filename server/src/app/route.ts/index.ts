import express from 'express';


import { teamMemberRouter } from '../modules/teamMember/teamMember.route';
import { serviceRoute } from '../modules/service/service.route';
import { AuthRoutes } from '../modules/auth/auth.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: AuthRoutes
    },

    {
        path: '/team-members',
        route: teamMemberRouter
    },
    {
        path: '/service',
        route: serviceRoute
    },
    
];

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router;