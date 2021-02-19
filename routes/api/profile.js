const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
//@route GET api/profile/me
//@desc Get current user's profile
//@access Private

router.get('/me', auth, async (req, res) => {
  try {
    // bring name and avatar from user
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no current user profile' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      github,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      likedin,
    } = req.body;

    const newProfile = {};
    newProfile.user = req.user.id;
    if (company) newProfile.company = company;
    if (website) newProfile.website = website;
    if (location) newProfile.location = location;
    if (bio) newProfile.bio = bio;
    if (status) newProfile.status = status;
    if (github) newProfile.github = github;
    if (skills) {
      newProfile.skills = skills.split(',').map((skill) => skill.trim());
    }
    //social object
    newProfile.social = {};
    if (youtube) newProfile.social.youtube = youtube;
    if (facebook) newProfile.social.facebook = facebook;
    if (twitter) newProfile.social.twitter = twitter;
    if (instagram) newProfile.social.instagram = instagram;
    if (likedin) newProfile.social.likedin = likedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: newProfile },
          { new: true }
        );
      } else {
        profile = new Profile(newProfile);
      }
      await profile.save();
      return res.json(profile);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/profile
//@desc Get all user profiles
//@access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/user/:user_id
//@desc Get user profile by id
//@access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }

    res.json(profile);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No profile found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route DELETE api/profile
//@desc Delete profile, user&posts
//@access Private
router.delete('/', auth, async (req, res) => {
  try {
    // todo - remove users posts
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
