#include <stdio.h>
main() {
    int a = 1;
    while (a <= 20){
        if(a % 3 == 0)
        printf("%2d ", a);
        a++;
    }
}
