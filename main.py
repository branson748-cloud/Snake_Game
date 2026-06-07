import pygame
import random

pygame.init()

# Screen setup
WIDTH, HEIGHT = 600, 600
CELL_SIZE = 20

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Snake Game")

clock = pygame.time.Clock()

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# Snake setup
snake = [(100, 100), (80, 100), (60, 100)]
direction = "RIGHT"

# Food
food = (200, 200)

def spawn_food():
    x = random.randrange(0, WIDTH, CELL_SIZE)
    y = random.randrange(0, HEIGHT, CELL_SIZE)
    return (x, y)

food = spawn_food()

running = True

while running:
    clock.tick(10)

    # --- EVENTS ---
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()

    if keys[pygame.K_UP] and direction != "DOWN":
        direction = "UP"
    if keys[pygame.K_DOWN] and direction != "UP":
        direction = "DOWN"
    if keys[pygame.K_LEFT] and direction != "RIGHT":
        direction = "LEFT"
    if keys[pygame.K_RIGHT] and direction != "LEFT":
        direction = "RIGHT"

    # --- MOVE SNAKE ---
    head_x, head_y = snake[0]

    if direction == "UP":
        head_y -= CELL_SIZE
    if direction == "DOWN":
        head_y += CELL_SIZE
    if direction == "LEFT":
        head_x -= CELL_SIZE
    if direction == "RIGHT":
        head_x += CELL_SIZE

    new_head = (head_x, head_y)
    snake.insert(0, new_head)

    # --- EAT FOOD ---
    if new_head == food:
        food = spawn_food()
    else:
        snake.pop()

    # --- COLLISIONS ---
    if (
        head_x < 0 or head_x >= WIDTH or
        head_y < 0 or head_y >= HEIGHT or
        new_head in snake[1:]
    ):
        running = False

    # --- DRAW ---
    screen.fill(BLACK)

    # snake
    for part in snake:
        pygame.draw.rect(screen, WHITE, (*part, CELL_SIZE, CELL_SIZE))

    # food
    pygame.draw.rect(screen, RED, (*food, CELL_SIZE, CELL_SIZE))

    pygame.display.update()

pygame.quit()