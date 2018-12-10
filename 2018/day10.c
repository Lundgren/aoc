#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

#define INPUT "day10.fixed.input"
#define INPUT_SIZE 343

struct Point {
    int posX;
    int posY;
    int velX;
    int velY;
};

struct BoundingBox {
    long maxX;
    long minX;
    long maxY;
    long minY;
    long size;
};

struct BoundingBox next_bounding_box(struct Point points[])
{
    struct BoundingBox bb;
    bb.maxX = INT_MIN;
    bb.minX = INT_MAX;
    bb.maxY = INT_MIN;
    bb.minY = INT_MAX;
    int i;

    for (i = 0; i < INPUT_SIZE; i++) {
        struct Point p = points[i];
        int x = p.posX + p.velX;
        int y = p.posY + p.velY;

        if (bb.maxX < x) {
            bb.maxX = x;
        }
        if (bb.minX > x) {
            bb.minX = x;
        }
        if (bb.maxY < y) {
            bb.maxY = y;
        }
        if (bb.minY > y) {
            bb.minY = y;
        }
    }

    bb.size = (bb.maxX - bb.minX) * (bb.maxY - bb.minY);
    return bb;
}

void tick(struct Point points[]) 
{
    int i;
    for (i = 0; i < INPUT_SIZE; i++) {
        struct Point *p = &points[i];

        p->posX = p->posX + p->velX;
        p->posY = p->posY + p->velY;
    }
}

void print(struct Point points[], struct BoundingBox bb)
{
    int width = bb.maxX - bb.minX + 1;
    int height = bb.maxY - bb.minY + 1;
    int col, row, i;

    int out[height][width];
    for (row = 0; row < height; row++) {
        for (col = 0; col < width; col++) {
            out[row][col] = 0;
        }
    }

    for (i = 0; i < INPUT_SIZE; i++) {
        struct Point p = points[i];
        out[p.posY - bb.minY][p.posX - bb.minX] = 1;
    }

    for (row = 0; row < height; row++) {
        for (col = 0; col < width; col++) {
            if (out[row][col] == 1) {
                printf("#");
            }
            else {
                printf(".");
            }
        }
        printf("\n");
    }
}

int main() 
{
    FILE *fp;
    char *line = NULL;
    size_t len = 0;
    struct Point points[INPUT_SIZE];
    int i = 0;

    fp = fopen(INPUT, "r");

    while (getline(&line, &len, fp) != -1) {
        line[strcspn(line, "\r\n")] = 0;

        struct Point point;
        char *p = strtok(line, " ");

        point.posX = atoi(p);
        p = strtok(NULL, " ");
        point.posY = atoi(p);
        p = strtok(NULL, " ");
        point.velX = atoi(p);
        p = strtok(NULL, " ");
        point.velY = atoi(p);

        points[i++] = point;
    }

    struct BoundingBox curr = next_bounding_box(points);
    struct BoundingBox next = curr;
    int ticks = 0;
    while (curr.size >= next.size) {
        tick(points);
        ticks++;

        curr = next;
        next = next_bounding_box(points);
    }

    print(points, curr);
    printf("Finding letters took %ds\n", ticks);

    return 0;
}