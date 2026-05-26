#include <ArenaPrototype/ArenaPrototypeSystemComponent.h>

#include <AzCore/Serialization/SerializeContext.h>

namespace ArenaPrototype
{
    void ArenaPrototypeSystemComponent::Reflect(AZ::ReflectContext* context)
    {
        if (auto* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
        {
            serializeContext->Class<ArenaPrototypeSystemComponent, AZ::Component>()
                ->Version(1);
        }
    }

    void ArenaPrototypeSystemComponent::GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided)
    {
        provided.push_back(AZ_CRC_CE("ArenaPrototypeService"));
    }

    void ArenaPrototypeSystemComponent::GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible)
    {
        incompatible.push_back(AZ_CRC_CE("ArenaPrototypeService"));
    }

    void ArenaPrototypeSystemComponent::GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
    {
        AZ_UNUSED(required);
    }

    void ArenaPrototypeSystemComponent::GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent)
    {
        AZ_UNUSED(dependent);
    }

    void ArenaPrototypeSystemComponent::Activate()
    {
    }

    void ArenaPrototypeSystemComponent::Deactivate()
    {
    }
}

