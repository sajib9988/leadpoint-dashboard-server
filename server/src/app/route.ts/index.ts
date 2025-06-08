import express from 'express';
import { customerRoutes } from '../modules/customer/customer.route';

import { teamMemberRouter } from '../modules/teamMember/teamMember.route';
import { serviceRoute } from '../modules/service/service.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/customers',
        route: customerRoutes
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