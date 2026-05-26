local ArenaPlayerController =
{
    Properties =
    {
        MoveSpeed = 6.0,
        BoundsX = 12.0,
        BoundsY = 7.0
    }
}

function ArenaPlayerController:OnActivate()
    self.tickBusHandler = TickBus.Connect(self)
    self.input = Vector3(0.0, 0.0, 0.0)
end

function ArenaPlayerController:OnDeactivate()
    if self.tickBusHandler then
        self.tickBusHandler:Disconnect()
    end
end

function ArenaPlayerController:OnTick(deltaTime, scriptTime)
    local transform = TransformBus.Event.GetWorldTM(self.entityId)
    local position = transform:GetTranslation()

    local move = self:ReadKeyboardInput()
    position.x = Math.Clamp(position.x + move.x * self.Properties.MoveSpeed * deltaTime, -self.Properties.BoundsX, self.Properties.BoundsX)
    position.y = Math.Clamp(position.y + move.y * self.Properties.MoveSpeed * deltaTime, -self.Properties.BoundsY, self.Properties.BoundsY)

    transform:SetTranslation(position)
    TransformBus.Event.SetWorldTM(self.entityId, transform)
end

function ArenaPlayerController:ReadKeyboardInput()
    local x = 0.0
    local y = 0.0

    if Input.IsKeyDown("keyboard_key_alphanumeric_A") or Input.IsKeyDown("keyboard_key_arrow_left") then
        x = x - 1.0
    end

    if Input.IsKeyDown("keyboard_key_alphanumeric_D") or Input.IsKeyDown("keyboard_key_arrow_right") then
        x = x + 1.0
    end

    if Input.IsKeyDown("keyboard_key_alphanumeric_W") or Input.IsKeyDown("keyboard_key_arrow_up") then
        y = y + 1.0
    end

    if Input.IsKeyDown("keyboard_key_alphanumeric_S") or Input.IsKeyDown("keyboard_key_arrow_down") then
        y = y - 1.0
    end

    return Vector3(x, y, 0.0):GetNormalizedSafe()
end

return ArenaPlayerController

