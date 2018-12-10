#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define INPUT "day10.fixed.input"

struct Point {
    int posX;
    int posY;
    int velX;
    int velY;
};

int main() 
{
    FILE *fp;
    char *line = NULL;
    size_t len = 0;
    struct Point points[343];
    int i = 0;

    fp = fopen(INPUT, "r");

    while (getline(&line, &len, fp) != -1) {
        line[strcspn(line, "\r\n")] = 0;

        struct Point point;
        char *p = strtok(line, "\t");

        point.posX = atoi(p);
        p = strtok(NULL, " ");
        point.posY = atoi(p);
        p = strtok(NULL, " ");
        point.velX = atoi(p);
        p = strtok(NULL, " ");
        point.velY = atoi(p);

        // points[i++] = point;
        printf("%s", line);
        printf("%d, %d -> %d, %d\n", point.posX, point.posY, point.velX, point.velY);
    }

    return 0;
}