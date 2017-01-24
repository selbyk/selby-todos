'use strict';

// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

exports.addUser = hook => { hook.data.user = hook.params.user._id; };

exports.filterByCurrentUser = hook => { hook.params.query.user = hook.params.user._id };
