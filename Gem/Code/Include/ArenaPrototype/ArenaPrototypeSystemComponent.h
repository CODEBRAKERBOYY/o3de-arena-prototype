#pragma once

#include <AzCore/Component/Component.h>

namespace ArenaPrototype
{
    class ArenaPrototypeSystemComponent final
        : public AZ::Component
    {
    public:
        AZ_COMPONENT(ArenaPrototypeSystemComponent, "{961A55C6-8BA7-4B83-9DBF-6E97B34BEA53}");

        static void Reflect(AZ::ReflectContext* context);
        static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
        static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
        static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
        static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);

    protected:
        void Activate() override;
        void Deactivate() override;
    };
}

