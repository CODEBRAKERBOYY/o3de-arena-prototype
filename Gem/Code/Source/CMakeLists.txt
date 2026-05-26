ly_add_target(
    NAME ArenaPrototype.Static STATIC
    NAMESPACE Gem
    FILES_CMAKE
        arena_prototype_files.cmake
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PUBLIC
            AZ::AzCore
)

ly_add_target(
    NAME ArenaPrototype ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
    NAMESPACE Gem
    FILES_CMAKE
        arena_prototype_shared_files.cmake
    INCLUDE_DIRECTORIES
        PRIVATE
            Source
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            Gem::ArenaPrototype.Static
)

