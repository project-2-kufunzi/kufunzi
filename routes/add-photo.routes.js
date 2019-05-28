const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const uploadCloud = require('../config/cloudinary.config');
const router = express.Router();