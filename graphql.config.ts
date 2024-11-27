import type {IGraphQLConfig} from 'graphql-config';

const config: IGraphQLConfig = {
    // define graphql schema provied by Refine
    schema: 'https://api.crm.refine.dev/graphql',
    extensions: {
        // codegen  is a plugin that generates typescript types from GraphQl schema
        // https://the-gulid.dev/graphql/codegen

        codegen: {
            // hooks are commands that are executed  after a certain event
            hooks:{
                afterOneFileWrite :  ['eslint --fix','prettier --write'],
            },
            // generates typescript types from GraphQL schema
            generates: {
                // specify the output path of the generated types
                'src/graphql/schema.types.ts':{
                    //use typescript plugin
                    plugins: ['typescript'],
                    // set the config of the typescript plugin
                    // this defines how the generated types will look like
                    config: {
                        skipTypename: true,  // skipTypename is used to remove
                        // __typename from the generated types
                        enumsAsType: true,  // enumAsType is used to generate enums as types instead of enums.
                        // scalars is used to define how the scalars i.e. DateTime,Json, etc. will be generated
                        // scalars is a type that is not a list and does not have fields. Meaning it is a primitive type.
                        scalars: {
                            // DateTime is a scalar type that is used to represent date and time
                            DateTime: {
                                input:'string',
                                output:'string',
                                format: 'date-time',
                            },
                        },
                    },
                },

                // generates typescript types from Graphql operations
                // graphql operations are queries, mutation and subscriptions we write in our code to communicate whit the GraphQL API
                
                'src/graphql/types.ts':{
                    // preset is a plugin that is used to generate typescript types from GraphQL operations
                    // import-types suggests to import types from schema.types.ts or other files
                    // this is used to avoid duplication of types
                    // https://the-guild.dev/graphql/codegen/plugins/presets/impor-types-preset
                    preset:'import-types',
                    // documents is used to define the path of files that contain GraphQL operations
                    document: ['src/**/*.{ts,tsx}'],

                    // plugins is used to define the plugins that will be used to generate typescript types from GraphQL operations
                    plugins:['typescript-operations'],
                    config:{
                        skipTypename:true,
                        enumsAsTypes:true,
                        preResolveTypes:false,
                        useTypeImports:true,
                    },

                    // presetConfig is used to define the config of the preset
                    presetConfig:{
                        typesPath:'./schema.types',
                    },
                },

            },
        },
    },
};

export default config;
