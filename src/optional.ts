module.exports = (pkg) => {
    switch (pkg) {
        case 'type-graphql':
            return require('type-graphql');
        case 'graphql':
            return require('graphql');
        default:
            return require(pkg);
    }
};
